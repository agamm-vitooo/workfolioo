export type CloudinaryTransformOptions = {
  w?: number;
  h?: number;
  c?: string; // e.g. "fill", "fit"
  q?: string; // e.g. "auto"
  f?: string; // e.g. "auto"
};

/**
 * Inject Cloudinary transformations into an existing URL.
 *
 * Example:
 *  https://res.cloudinary.com/<cloud>/image/upload/v1234/a.png
 * -> https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_120,h_60,c_fill/v1234/a.png
 */
export function withCloudinaryTransformations(
  url: string | undefined | null,
  options: CloudinaryTransformOptions
): string {
  if (!url) return "";

  // If not a Cloudinary URL, return as-is.
  if (!url.includes("/image/upload/")) return url;

  const marker = "/image/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;

  const transform = buildTransformString(options);
  if (!transform) return url;

  // Insert transformations right after /image/upload/
  const before = url.slice(0, idx + marker.length);
  const after = url.slice(idx + marker.length);

  return `${before}${transform}/${after}`;
}

function buildTransformString(options: CloudinaryTransformOptions): string {
  const parts: string[] = [];

  if (options.f) parts.push(`f_${options.f}`);
  if (options.q) parts.push(`q_${options.q}`);
  if (typeof options.w === "number") parts.push(`w_${options.w}`);
  if (typeof options.h === "number") parts.push(`h_${options.h}`);
  if (options.c) parts.push(`c_${options.c}`);

  return parts.join(",");
}

