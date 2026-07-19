import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Method } from "@/components/sections/Method";
import { FinalCTA } from "@/components/sections/FinalCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cabinetPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return buildPageMetadata({
    locale,
    pathname: "/cabinet",
    title: tNav("cabinet"),
    description: t("heroDescription"),
  });
}

export default async function CabinetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("cabinetPage");
  const tNav = await getTranslations("nav");
  const valeurs = t.raw("valeurs") as { t: string; d: string }[];

  return (
    <>
      <PageHero
        eyebrow={tNav("cabinet")}
        title={t("heroTitle")}
        description={t("heroDescription")}
      />

      <section className="py-24 md:py-32">
        <Container className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16">
          <Reveal>
            <SectionHeading
              index={0}
              eyebrow={t("parcoursEyebrow")}
              title={t("parcoursTitle")}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-[15px] leading-relaxed text-noir/70">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 md:py-32 bg-anthracite text-blanc-casse">
        <Container className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16">
          <Reveal>
            <SectionHeading
              index={1}
              eyebrow={t("valeursEyebrow")}
              title={t("valeursTitle")}
              light
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
              {valeurs.map((v) => (
                <div key={v.t}>
                  <h3 className="font-display text-lg text-dore">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blanc-casse/60">
                    {v.d}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <WhyUs />
      <Method />
      <FinalCTA />
    </>
  );
}
