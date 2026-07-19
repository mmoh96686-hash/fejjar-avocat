import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buildDomaines } from "@/lib/domains";

export function Practice() {
  const t = useTranslations("practice");
  const tDomains = useTranslations("domains");
  const domaines = buildDomaines(tDomains.raw("order"), tDomains.raw("items"));

  return (
    <section className="py-24 md:py-32 bg-anthracite text-blanc-casse">
      <Container>
        <Reveal>
          <SectionHeading index={1} eyebrow={t("eyebrow")} title={t("title")} light />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {domaines.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.05}>
              <Link
                href={`/domaines/${d.slug}`}
                className="group flex items-start justify-between gap-6 py-7 border-t border-blanc-casse/15"
              >
                <div>
                  <h3 className="font-display text-xl group-hover:text-dore transition-colors">
                    {d.nom}
                  </h3>
                  <p className="mt-2 text-sm text-blanc-casse/55 max-w-md leading-relaxed">
                    {d.resume}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  className="shrink-0 mt-1 text-blanc-casse/40 group-hover:text-dore rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
