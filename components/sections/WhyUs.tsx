import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUs() {
  const t = useTranslations("whyUs");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading index={2} eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
          {items.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="ps-6 border-s border-dore/40">
                <h3 className="font-display text-lg">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-noir/60">
                  {r.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
