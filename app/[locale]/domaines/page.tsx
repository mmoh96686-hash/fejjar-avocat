import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { buildDomaines } from "@/lib/domains";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "domainesPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return buildPageMetadata({
    locale,
    pathname: "/domaines",
    title: tNav("domaines"),
    description: t("heroDescription"),
  });
}

export default async function DomainesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("domainesPage");
  const tNav = await getTranslations("nav");
  const td = await getTranslations("domains");
  const domaines = buildDomaines(
    td.raw("order") as string[],
    td.raw("items") as Record<string, { nom: string; resume: string; description: string; prestations: string[] }>
  );

  return (
    <>
      <PageHero
        eyebrow={tNav("domaines")}
        title={t("heroTitle")}
        description={t("heroDescription")}
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {domaines.map((d, i) => (
              <Reveal key={d.slug} delay={i * 0.05}>
                <Link
                  href={`/domaines/${d.slug}`}
                  className="group flex items-start justify-between gap-6 py-8 border-t border-noir/10"
                >
                  <div>
                    <span className="font-display italic text-dore-fonce text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 font-display text-2xl group-hover:text-dore-fonce transition-colors">
                      {d.nom}
                    </h2>
                    <p className="mt-3 text-sm text-noir/60 max-w-md leading-relaxed">
                      {d.resume}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 mt-8 text-noir/30 group-hover:text-dore-fonce group-hover:translate-x-1 group-hover:-translate-y-1 transition-all rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
