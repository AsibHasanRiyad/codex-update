export const SITE_NAME = "2 Creative";
export const SITE_URL = "https://2-creative.com";

export function buildCanonicalUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalizedPath}`;
}