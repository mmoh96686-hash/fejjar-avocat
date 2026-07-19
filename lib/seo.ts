import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { CABINET, getCabinetName } from "@/lib/constants";

/**
 * Builds the `alternates` metadata block (canonical + hreflang) for a given
 * page. `pathname` must be the locale-agnostic path (e.g. "/cabinet",
 * "/domaines/droit-civil", or "" for the homepage) — the French (default)
 * locale is unprefixed and Arabic is served under /ar, per routing.ts.
 */
export function buildAlternates(locale: string, pathname: string) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      `${CABINET.siteUrl}${l === routing.defaultLocale ? "" : `/${l}`}${pathname}`,
    ])
  ) as Record<string, string>;
  languages["x-default"] = `${CABINET.siteUrl}${pathname}`;

  return {
    canonical: languages[locale] ?? languages[routing.defaultLocale],
    languages,
  };
}

/**
 * Full per-page metadata: title, description, self-referencing canonical +
 * hreflang alternates, and page-specific Open Graph / Twitter Card entries
 * (the root layout only provides sitewide defaults, which are used as-is —
 * not deep-merged — by any page that doesn't set its own openGraph/twitter,
 * so every indexable page must set these explicitly for correct social
 * previews).
 */
export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  noIndex,
}: {
  locale: string;
  pathname: string;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const alternates = buildAlternates(locale, pathname);

  return {
    title,
    description,
    alternates,
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_MA" : "fr_MA",
      url: alternates.canonical,
      siteName: getCabinetName(locale),
      title,
      description,
      images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-cover.jpg"],
    },
  };
}
