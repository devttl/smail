import {
	getAllBlogSlugs,
	getBlogPageCount,
	getBlogPostMeta,
} from "~/blog/data";
import { SUPPORTED_LOCALES, toLocalePath } from "~/i18n/config";
import {
	BASE_URL,
	BLOG_BASE_PATH,
	BLOG_INDEXABLE_LOCALES,
	MARKDOWN_BASE_PATHS,
	MARKDOWN_INDEXABLE_LOCALES,
} from "~/seo.config";

const STATIC_PATHS = ["/", "/contact"] as const;

type SitemapEntry = {
	path: string;
	lastmod?: string;
};

export async function loader() {
	const seen = new Set<string>();
	const entries: SitemapEntry[] = [];

	function addEntry(path: string, lastmod?: string) {
		if (seen.has(path)) {
			return;
		}
		seen.add(path);
		entries.push({ path, lastmod });
	}

	for (const locale of SUPPORTED_LOCALES) {
		for (const staticPath of STATIC_PATHS) {
			addEntry(toLocalePath(staticPath, locale));
		}
	}

	for (const locale of MARKDOWN_INDEXABLE_LOCALES) {
		for (const basePath of MARKDOWN_BASE_PATHS) {
			addEntry(toLocalePath(basePath, locale));
		}
	}

	const blogSlugs = getAllBlogSlugs();
	for (const locale of BLOG_INDEXABLE_LOCALES) {
		addEntry(toLocalePath(BLOG_BASE_PATH, locale));

		const totalPages = getBlogPageCount(locale);
		for (let page = 2; page <= totalPages; page++) {
			addEntry(toLocalePath(`${BLOG_BASE_PATH}/page/${page}`, locale));
		}

		for (const slug of blogSlugs) {
			const post = getBlogPostMeta(locale, slug);
			addEntry(
				toLocalePath(`${BLOG_BASE_PATH}/${slug}`, locale),
				post?.updatedAt ?? post?.publishedAt,
			);
		}
	}

	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
		entries
			.map(({ path, lastmod }) => {
				const lastmodElement = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
				return `\n  <url>\n    <loc>${BASE_URL}${path}</loc>${lastmodElement}\n  </url>`;
			})
			.join("") +
		"\n</urlset>\n";

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=1800",
		},
	});
}
