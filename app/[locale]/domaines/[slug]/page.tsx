import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildDomaines, type Domaine } from "@/lib/domains";
import frMessages from "@/messages/fr.json";

// Slugs are identical across locales, so any single locale's message file
// is enough to enumerate them for static generation.
export function generateStaticParams() {
  return frMessages.domains.order.map((slug) => ({ slug }));
}

async function getDomaine(locale: string, slug: string): Promise<{ domaine: Domaine | undefined; all: Domaine[] }> {
  const td = await getTranslations({ locale, namespace: "domains" });
  const all = buildDomaines(
    td.raw("order") as string[],
    td.raw("items") as Record<string, { nom: string; resume: string; description: string; prestations: string[] }>
  );
  return { domaine: all.find((d) => d.slug === slug), all };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { domaine } = await getDomaine(locale, slug);
  if (!domaine) return {};
  return buildPageMetadata({
    locale,
    pathname: `/domaines/${slug}`,
    title: domaine.nom,
    description: domaine.resume,
  });
}

export default async function DomainePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const { domaine, all } = await getDomaine(locale, slug);
  if (!domaine) notFound();

  const t = await getTranslations("domainePage");
  const autres = all.filter((d) => d.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={domaine.nom} />

      <section className="py-24 md:py-32">
        <Container className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16">
          <Reveal>
            <p className="text-[15px] leading-relaxed text-noir/70">
              {domaine.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="secondary">
                {t("ctaSecondary")}
              </Button>
              <WhatsAppButton domainSlug={slug} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-anthracite text-blanc-casse p-8">
              <h2 className="font-display text-lg text-dore">
                {t("prestationsTitle")}
              </h2>
              <ul className="mt-6 space-y-4">
                {domaine.prestations.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-blanc-casse/75">
                    <Check size={16} strokeWidth={1.5} className="mt-0.5 text-dore shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 border-t border-noir/10">
        <Container>
          <h2 className="font-display text-2xl">{t("autresDomainesTitle")}</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {autres.map((d) => (
              <Link
                key={d.slug}
                href={`/domaines/${d.slug}`}
                className="block border-t border-noir/10 pt-5 hover:text-dore-fonce transition-colors"
              >
                <h3 className="font-display text-lg">{d.nom}</h3>
                <p className="mt-2 text-sm text-noir/55 leading-relaxed">
                  {d.resume}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
