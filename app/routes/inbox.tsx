import { redirect } from "react-router";
import { commitSession, getSession } from "~/.server/session";
import {
	getMailDomains,
	isAllowedRecipientAddress,
	normalizeRecipientAddress,
} from "~/utils/mail-domains";
import type { Route } from "./+types/inbox";

export async function loader({ request, params, context }: Route.LoaderArgs) {
	const address = normalizeRecipientAddress(params.address ?? "");
	const mailDomains = getMailDomains(context.cloudflare.env.MAIL_DOMAINS);
	if (!address || !isAllowedRecipientAddress(address, mailDomains)) {
		throw new Response("Not Found", { status: 404 });
	}

	const session = await getSession(request.headers.get("Cookie"));
	session.set("addresses", [address]);
	session.set("addressIssuedAt", Date.now());

	throw redirect("/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export default function InboxRedirect() {
	return null;
}
