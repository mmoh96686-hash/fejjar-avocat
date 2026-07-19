import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function About() {
  const t = useTranslations("about");

  return (
    <section className="py-24 md:py-32">
      <Container className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
        <Reveal>
          <SectionHeading index={0} eyebrow={t("eyebrow")} title={t("title")} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-[15px] leading-relaxed text-noir/70">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <Button href="/cabinet" variant="secondary" className="mt-2">
              {t("cta")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
