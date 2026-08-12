export const DEFAULT_MAIL_DOMAIN = "cleanorapi.com";

const DOMAIN_PATTERN = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const LOCAL_PART_PATTERN = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
const CUSTOM_PREFIX_PATTERN = /^[a-z0-9](?:[a-z0-9._-]{0,30}[a-z0-9])?$/;

export const RESERVED_MAILBOX_PREFIXES = [
	"abuse",
	"admin",
	"administrator",
	"billing",
	"contact",
	"help",
	"hostmaster",
	"info",
	"mailer-daemon",
	"no-reply",
	"noreply",
	"postmaster",
	"privacy",
	"root",
	"security",
	"support",
	"system",
	"webmaster",
] as const;

const RESERVED_PREFIX_SEPARATOR_PATTERN = /^[._+-]/;

export function normalizeMailDomain(value: string): string | null {
	const normalized = value.trim().toLowerCase().replace(/\.$/, "");
	return DOMAIN_PATTERN.test(normalized) ? normalized : null;
}

export function getMailDomains(value: string | undefined): string[] {
	const domains = (value ?? "")
		.split(",")
		.map(normalizeMailDomain)
		.filter((domain): domain is string => Boolean(domain));

	return domains.length > 0 ? [...new Set(domains)] : [DEFAULT_MAIL_DOMAIN];
}

export function getMailDomainFromAddress(address: string): string | null {
	const separatorIndex = address.lastIndexOf("@");
	if (separatorIndex <= 0 || separatorIndex === address.length - 1) {
		return null;
	}
	return normalizeMailDomain(address.slice(separatorIndex + 1));
}

export function getMailLocalPartFromAddress(address: string): string | null {
	const separatorIndex = address.lastIndexOf("@");
	if (separatorIndex <= 0 || separatorIndex === address.length - 1) {
		return null;
	}
	const localPart = address.slice(0, separatorIndex).trim().toLowerCase();
	return LOCAL_PART_PATTERN.test(localPart) ? localPart : null;
}

export function isReservedMailboxPrefix(value: string): boolean {
	const normalized = value.trim().toLowerCase();
	return RESERVED_MAILBOX_PREFIXES.some(
		(reserved) =>
			normalized === reserved ||
			(normalized.startsWith(reserved) &&
				RESERVED_PREFIX_SEPARATOR_PATTERN.test(
					normalized.slice(reserved.length),
				)),
	);
}

export function normalizeRecipientAddress(address: string): string | null {
	const separatorIndex = address.lastIndexOf("@");
	if (separatorIndex <= 0 || separatorIndex === address.length - 1) {
		return null;
	}

	const localPart = address.slice(0, separatorIndex).trim().toLowerCase();
	const domain = normalizeMailDomain(address.slice(separatorIndex + 1));
	if (!LOCAL_PART_PATTERN.test(localPart) || !domain) {
		return null;
	}

	return `${localPart}@${domain}`;
}

export function isAllowedRecipientAddress(
	address: string,
	allowedDomains: readonly string[],
): boolean {
	const domain = getMailDomainFromAddress(address);
	const localPart = getMailLocalPartFromAddress(address);
	return (
		domain !== null &&
		localPart !== null &&
		allowedDomains.includes(domain) &&
		!isReservedMailboxPrefix(localPart)
	);
}

export function normalizeCustomMailboxPrefix(value: string): string | null {
	const normalized = value.trim().toLowerCase();
	if (
		!CUSTOM_PREFIX_PATTERN.test(normalized) ||
		normalized.includes("..") ||
		isReservedMailboxPrefix(normalized)
	) {
		return null;
	}
	return normalized;
}
