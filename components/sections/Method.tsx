import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Method() {
  const t = useTranslations("method");
  const steps = t.raw("steps") as { num: string; title: string; text: string }[];

  return (
    <section className="py-24 md:py-32 bg-noir text-blanc-casse">
      <Container>
        <Reveal>
          <SectionHeading index={3} eyebrow={t("eyebrow")} title={t("title")} light />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((e, i) => (
            <Reveal key={e.num} delay={i * 0.08}>
              <div>
                <span className="font-display italic text-3xl text-dore">
                  {e.num}
                </span>
                <h3 className="mt-4 text-base uppercase tracking-[0.08em]">
                  {e.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-blanc-casse/55">
                  {e.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
