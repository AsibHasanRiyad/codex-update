import { useEffect } from "react";
import { SITE_NAME, buildCanonicalUrl } from "../constants/seo";

function upsertMeta(selector, attrs) {
  let node = document.head.querySelector(selector);

  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
}

function upsertLink(selector, attrs) {
  let node = document.head.querySelector(selector);

  if (!node) {
    node = document.createElement("link");
    document.head.appendChild(node);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
}

export function useSEO({ title, description, pathname, schema }) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const cleanDescription =
      description ||
      "2 Creative delivers digital solutions including web development, mobile apps, cloud services, digital marketing, UI/UX, interior design, and IoT.";

    document.title = pageTitle;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: cleanDescription,
    });

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow, max-image-preview:large",
    });

    const canonicalPath = pathname || window.location.pathname;
    const canonicalUrl = buildCanonicalUrl(canonicalPath);

    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: cleanDescription,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: pageTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: cleanDescription,
    });

    if (schema) {
      const existing = document.getElementById("dynamic-schema");
      const schemaNode = existing || document.createElement("script");
      schemaNode.id = "dynamic-schema";
      schemaNode.type = "application/ld+json";
      schemaNode.text = JSON.stringify(schema);

      if (!existing) {
        document.head.appendChild(schemaNode);
      }
    }
  }, [title, description, pathname, schema]);
}
