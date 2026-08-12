import { useEffect, useRef } from "react";
import { isAdSenseClient, isAdSenseSlot } from "~/utils/adsense";

declare global {
	interface Window {
		adsbygoogle?: Record<string, unknown>[];
	}
}

const ADSENSE_SCRIPT_ID = "google-adsense-script";

function ensureAdSenseScript(client: string): void {
	if (document.getElementById(ADSENSE_SCRIPT_ID)) {
		return;
	}

	const script = document.createElement("script");
	script.id = ADSENSE_SCRIPT_ID;
	script.async = true;
	script.crossOrigin = "anonymous";
	script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
	document.head.appendChild(script);
}

export function AdSlot({
	client,
	slot,
}: {
	client: string | undefined;
	slot: string | null | undefined;
}) {
	const elementRef = useRef<HTMLModElement>(null);
	const enabled = isAdSenseClient(client) && isAdSenseSlot(slot ?? undefined);

	useEffect(() => {
		if (!enabled || !client || !elementRef.current) {
			return;
		}
		if (elementRef.current.dataset.adInitialized === "true") {
			return;
		}

		ensureAdSenseScript(client);
		elementRef.current.dataset.adInitialized = "true";
		try {
			window.adsbygoogle = window.adsbygoogle || [];
			window.adsbygoogle.push({});
		} catch (error) {
			delete elementRef.current.dataset.adInitialized;
			console.error("Failed to initialize AdSense slot", error);
		}
	}, [client, enabled]);

	if (!enabled) {
		return null;
	}

	return (
		<aside
			className="my-6 min-h-[180px] border-y border-theme-soft py-3"
			aria-label="Advertisement"
		>
			<p className="text-theme-faint mb-2 text-center text-[10px] uppercase tracking-[0.16em]">
				Advertisement
			</p>
			<ins
				ref={elementRef}
				className="adsbygoogle block min-h-[150px]"
				data-ad-client={client}
				data-ad-slot={slot}
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>
		</aside>
	);
}
