const ADSENSE_CLIENT_PATTERN = /^ca-pub-\d+$/;
const ADSENSE_SLOT_PATTERN = /^\d+$/;

export type AdSenseEnv = {
	ADSENSE_ENABLED?: string;
	ADSENSE_CMP_READY?: string;
	ADSENSE_CLIENT?: string;
	ADSENSE_SLOT_ARTICLE?: string;
	ADSENSE_SLOT_BLOG_LIST?: string;
	ADSENSE_SLOT_CONTENT?: string;
	ADSENSE_SLOT_HOME?: string;
	ADSENSE_SLOT_INBOX?: string;
	ADSENSE_SLOT_EMAIL_DETAIL?: string;
};

export type AdSenseConfig = {
	client: string;
	articleSlot: string | null;
	blogListSlot: string | null;
	contentSlot: string | null;
	homeSlot: string | null;
	inboxSlot: string | null;
	emailDetailSlot: string | null;
};

export function isAdSenseClient(value: string | undefined): value is string {
	return Boolean(value && ADSENSE_CLIENT_PATTERN.test(value));
}

export function isAdSenseSlot(value: string | undefined): value is string {
	return Boolean(value && ADSENSE_SLOT_PATTERN.test(value));
}

export function getAdSenseConfig(env: AdSenseEnv): AdSenseConfig | null {
	const client = env.ADSENSE_CLIENT?.trim();
	if (
		env.ADSENSE_ENABLED !== "true" ||
		env.ADSENSE_CMP_READY !== "true" ||
		!isAdSenseClient(client)
	) {
		return null;
	}

	const articleSlot = env.ADSENSE_SLOT_ARTICLE?.trim();
	const blogListSlot = env.ADSENSE_SLOT_BLOG_LIST?.trim();
	const contentSlot = env.ADSENSE_SLOT_CONTENT?.trim();
	const homeSlot = env.ADSENSE_SLOT_HOME?.trim();
	const inboxSlot = env.ADSENSE_SLOT_INBOX?.trim();
	const emailDetailSlot = env.ADSENSE_SLOT_EMAIL_DETAIL?.trim();
	return {
		client,
		articleSlot: isAdSenseSlot(articleSlot) ? articleSlot : null,
		blogListSlot: isAdSenseSlot(blogListSlot) ? blogListSlot : null,
		contentSlot: isAdSenseSlot(contentSlot) ? contentSlot : null,
		homeSlot: isAdSenseSlot(homeSlot) ? homeSlot : null,
		inboxSlot: isAdSenseSlot(inboxSlot) ? inboxSlot : null,
		emailDetailSlot: isAdSenseSlot(emailDetailSlot)
			? emailDetailSlot
			: null,
	};
}

export function getAdSensePublisherId(env: AdSenseEnv): string | null {
	const client = env.ADSENSE_CLIENT?.trim();
	if (!isAdSenseClient(client)) {
		return null;
	}
	return client.replace(/^ca-/, "");
}
