import randomName from "@scaleway/random-name";
import { customAlphabet } from "nanoid";
import {
	DEFAULT_MAIL_DOMAIN,
	isReservedMailboxPrefix,
	normalizeCustomMailboxPrefix,
	normalizeMailDomain,
} from "~/utils/mail-domains";

const nanoSuffix = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

export function generateEmailAddress(domain = DEFAULT_MAIL_DOMAIN) {
	const normalizedDomain = normalizeMailDomain(domain);
	if (!normalizedDomain) {
		throw new Error("Invalid mail domain");
	}

	for (let attempt = 0; attempt < 10; attempt++) {
		const localPart = `${randomName()}-${nanoSuffix()}`.toLowerCase();
		if (!isReservedMailboxPrefix(localPart)) {
			return `${localPart}@${normalizedDomain}`;
		}
	}

	return `temp-${nanoSuffix()}@${normalizedDomain}`;
}

export function generateCustomEmailAddress(prefix: string, domain: string) {
	const normalizedDomain = normalizeMailDomain(domain);
	const normalizedPrefix = normalizeCustomMailboxPrefix(prefix);
	if (!normalizedDomain || !normalizedPrefix) {
		throw new Error("Invalid custom email address");
	}
	return `${normalizedPrefix}@${normalizedDomain}`;
}
