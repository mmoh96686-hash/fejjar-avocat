import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CABINET } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mentionsLegales" });
  return buildPageMetadata({
    locale,
    pathname: "/mentions-legales",
    title: t("title"),
    description: t("editeurText"),
    noIndex: true,
  });
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("mentionsLegales");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} />
      <section className="py-20 md:py-28">
        <Container className="max-w-2xl prose-legal">
          <h2>{t("editeurTitle")}</h2>
          <p>{t("editeurText")}</p>
          <p>
            {CABINET.adresse}
            <br />
            <bdi dir="ltr">{CABINET.telephone}</bdi>
            <br />
            {CABINET.email}
          </p>

          <h2>{t("directeurTitle")}</h2>
          <p>{t("directeurText")}</p>

          <h2>{t("hebergementTitle")}</h2>
          <p>{t("hebergementText")}</p>

          <h2>{t("propriteTitle")}</h2>
          <p>{t("proprieteText")}</p>

          <h2>{t("responsabiliteTitle")}</h2>
          <p>{t("responsabiliteText")}</p>

          <h2>{t("litigesTitle")}</h2>
          <p>{t("litigesText")}</p>
        </Container>
      </section>
    </>
  );
}
