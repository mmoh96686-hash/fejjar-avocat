import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "politiqueConfidentialite" });
  return buildPageMetadata({
    locale,
    pathname: "/politique-confidentialite",
    title: t("title"),
    description: t("donneesText"),
    noIndex: true,
  });
}

export default async function PolitiqueConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("politiqueConfidentialite");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} />
      <section className="py-20 md:py-28">
        <Container className="max-w-2xl prose-legal">
          <h2>{t("donneesTitle")}</h2>
          <p>{t("donneesText")}</p>

          <h2>{t("finaliteTitle")}</h2>
          <p>{t("finaliteText")}</p>

          <h2>{t("dureeTitle")}</h2>
          <p>{t("dureeText")}</p>

          <h2>{t("droitsTitle")}</h2>
          <p>{t("droitsText")}</p>

          <h2>{t("whatsappTitle")}</h2>
          <p>{t("whatsappText")}</p>

          <h2>{t("cookiesTitle")}</h2>
          <p>{t("cookiesText")}</p>

          <h2>{t("securiteTitle")}</h2>
          <p>{t("securiteText")}</p>
        </Container>
      </section>
    </>
  );
}
