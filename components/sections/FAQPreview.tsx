import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export function FAQPreview() {
  const t = useTranslations("faqPreview");
  const tRoot = useTranslations();
  const items = tRoot.raw("faqItems") as { q: string; a: string }[];

  return (
    <section className="py-24 md:py-32">
      <Container className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16">
        <Reveal>
          <SectionHeading index={4} eyebrow={t("eyebrow")} title={t("title")} />
          <Button href="/faq" variant="secondary" className="mt-8">
            {t("ctaAll")}
          </Button>
        </Reveal>
        <Reveal delay={0.1}>
          <FAQAccordion items={items.slice(0, 4).map((i) => ({ question: i.q, reponse: i.a }))} />
        </Reveal>
      </Container>
    </section>
  );
}
