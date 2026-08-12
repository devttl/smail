const D1_MAX_ROW_BYTES = 2_000_000;
const D1_ROW_RESERVE_BYTES = 100_000;

// Leave room for the email metadata stored in the same D1 row.
export const MAX_COMPRESSED_EMAIL_BYTES =
	D1_MAX_ROW_BYTES - D1_ROW_RESERVE_BYTES;
export const MAX_RAW_EMAIL_BYTES = 10_000_000;

export function fitsD1EmailRow(
	compressedBytes: number,
	metadata: Array<string | null>,
): boolean {
	const metadataBytes = metadata.reduce(
		(total, value) => total + new TextEncoder().encode(value ?? "").byteLength,
		0,
	);
	return compressedBytes + metadataBytes <= MAX_COMPRESSED_EMAIL_BYTES;
}

export async function compressEmail(raw: ArrayBuffer): Promise<ArrayBuffer> {
	const stream = new Blob([raw])
		.stream()
		.pipeThrough(new CompressionStream("gzip"));
	return new Response(stream).arrayBuffer();
}

export async function decompressEmail(
	compressed: ArrayBuffer | ArrayBufferView | number[],
): Promise<ArrayBuffer> {
	let bytes: Uint8Array;
	if (compressed instanceof ArrayBuffer) {
		bytes = new Uint8Array(compressed);
	} else if (ArrayBuffer.isView(compressed)) {
		bytes = new Uint8Array(
			compressed.buffer,
			compressed.byteOffset,
			compressed.byteLength,
		);
	} else {
		bytes = new Uint8Array(compressed);
	}

	const byteBuffer = Uint8Array.from(bytes).buffer;
	const stream = new Blob([byteBuffer])
		.stream()
		.pipeThrough(new DecompressionStream("gzip"));
	return new Response(stream).arrayBuffer();
}
