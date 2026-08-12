import { nanoid } from "nanoid";
import Parser from "postal-mime";
import { createRequestHandler } from "react-router";
import {
	compressEmail,
	fitsD1EmailRow,
	MAX_COMPRESSED_EMAIL_BYTES,
	MAX_RAW_EMAIL_BYTES,
} from "../app/utils/email-storage";
import {
	getMailDomains,
	isAllowedRecipientAddress,
	normalizeRecipientAddress,
} from "../app/utils/mail-domains";
import { getRetentionCutoff } from "../app/utils/mail-retention";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request, env, ctx) {
		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},
	async email(msg, env) {
		const allowedDomains = getMailDomains(env.MAIL_DOMAINS);
		const recipient = normalizeRecipientAddress(msg.to);
		if (!recipient || !isAllowedRecipientAddress(recipient, allowedDomains)) {
			msg.setReject("Unsupported recipient address");
			return;
		}
		if (msg.rawSize > MAX_RAW_EMAIL_BYTES) {
			msg.setReject("Message is too large to process");
			return;
		}

		const parser = new Parser();
		const ab = await new Response(msg.raw).arrayBuffer();
		const parsed = await parser.parse(ab);
		const compressed = await compressEmail(ab);
		const id = nanoid();
		const fromName = parsed.from?.name ?? null;
		const fromAddress = parsed.from?.address ?? msg.from;
		const subject = parsed.subject ?? null;
		if (
			compressed.byteLength > MAX_COMPRESSED_EMAIL_BYTES ||
			!fitsD1EmailRow(compressed.byteLength, [
				id,
				recipient,
				fromName,
				fromAddress,
				subject,
			])
		) {
			msg.setReject("Message is too large to store");
			return;
		}

		await env.D1.prepare(
			"INSERT INTO emails (id, to_address, from_name, from_address, subject, time, raw_blob) VALUES (?, ?, ?, ?, ?, ?, ?)",
		)
			.bind(
				id,
				recipient,
				fromName,
				fromAddress,
				subject,
				Date.now(),
				compressed,
			)
			.run();
	},
	async scheduled(_controller, env) {
		await env.D1.prepare(
			"DELETE FROM emails WHERE id IN (SELECT id FROM emails WHERE time < ? ORDER BY time LIMIT 3000)",
		)
			.bind(getRetentionCutoff())
			.run();
	},
} satisfies ExportedHandler<Env>;
