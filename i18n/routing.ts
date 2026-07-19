import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
  // "as-needed" keeps French (the default) at the existing, unprefixed URLs
  // (e.g. /cabinet) so no previously indexed URL changes — zero SEO
  // regression. Arabic pages live under /ar (e.g. /ar/cabinet).
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
