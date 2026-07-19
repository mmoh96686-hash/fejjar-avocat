import type { MetadataRoute } from "next";
import { CABINET } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import frMessages from "@/messages/fr.json";

/** Builds the fr (unprefixed) and ar (/ar-prefixed) URLs for a path, per the
 * "as-needed" locale prefix strategy used across the site. */
function localizedUrls(pathname: string) {
  const fr = `${CABINET.siteUrl}${pathname}`;
  const ar = `${CABINET.siteUrl}/ar${pathname}`;
  return { fr, ar };
}

function entry(pathname: string, lastModified: Date): MetadataRoute.Sitemap {
  const { fr, ar } = localizedUrls(pathname);
  const languages = { fr, ar, "x-default": fr };
  return [
    { url: fr, lastModified, alternates: { languages } },
    { url: ar, lastModified, alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/cabinet",
    "/domaines",
    "/faq",
    "/blog",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
  ];

  const staticRoutes = staticPaths.flatMap((p) => entry(p, now));

  const domaineRoutes = frMessages.domains.order.flatMap((slug) =>
    entry(`/domaines/${slug}`, now)
  );

  const blogRoutes = getAllPosts("fr").flatMap((p) =>
    entry(`/blog/${p.slug}`, new Date(p.date))
  );

  return [...staticRoutes, ...domaineRoutes, ...blogRoutes];
}
