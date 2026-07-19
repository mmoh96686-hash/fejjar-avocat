import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "@fontsource/fraunces/300.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "@fontsource/cairo/300.css";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/500.css";
import "@fontsource/cairo/600.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CABINET, getCabinetName } from "@/lib/constants";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const path = "";
  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      `${CABINET.siteUrl}${l === routing.defaultLocale ? "" : `/${l}`}${path}`,
    ])
  );
  languages["x-default"] = `${CABINET.siteUrl}${path}`;

  return {
    metadataBase: new URL(CABINET.siteUrl),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: getCabinetName(locale) }],
    icons: {
      icon: "/icon.png",
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_MA" : "fr_MA",
      url: languages[locale],
      siteName: getCabinetName(locale),
      title: t("titleDefault"),
      description: t("ogDescription"),
      images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("ogDescription"),
      images: ["/images/og-cover.jpg"],
    },
    alternates: {
      canonical: languages[locale],
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale's request-scoped content.
  setRequestLocale(locale as Locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: getCabinetName(locale),
    image: `${CABINET.siteUrl}/images/og-cover.jpg`,
    url: CABINET.siteUrl,
    telephone: CABINET.telephoneHref.replace("tel:", ""),
    email: CABINET.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CABINET.adresse,
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    areaServed: "Casablanca, Maroc",
    priceRange: "€€",
    availableLanguage: [CABINET.langueTraitementDossiers, "Français"],
    inLanguage: locale,
  };

  return (
    <html lang={locale} dir={dir}>
      <body className="font-body antialiased bg-blanc-casse text-noir">
        <NextIntlClientProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton variant="floating" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
