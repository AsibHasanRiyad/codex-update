export const SITE_NAME = "Codex IT";
export const SITE_URL = "https://mydevola.com";

export function buildCanonicalUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalizedPath}`;
}