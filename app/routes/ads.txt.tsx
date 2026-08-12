import { getAdSensePublisherId } from "~/utils/adsense";

import type { Route } from "./+types/ads.txt";

export async function loader({ context }: Route.LoaderArgs) {
	const publisherId = getAdSensePublisherId(context.cloudflare.env);
	if (!publisherId) {
		throw new Response("Not Found", { status: 404 });
	}

	return new Response(
		`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`,
		{
			headers: {
				"Cache-Control": "public, max-age=3600",
				"Content-Type": "text/plain; charset=utf-8",
			},
		},
	);
}
