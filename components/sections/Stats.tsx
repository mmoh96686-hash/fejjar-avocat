import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="py-20 border-y border-noir/10">
      <Container className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.05}>
            <div className="text-center md:text-start">
              <div className="font-display text-4xl md:text-5xl text-dore-fonce">
                {c.value}
              </div>
              <div className="mt-2 text-[12px] uppercase tracking-[0.15em] text-noir/55">
                {c.label}
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
