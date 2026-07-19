import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CABINET } from "@/lib/constants";

export async function FinalCTA() {
  const t = await getTranslations("finalCta");

  return (
    <section className="bg-noir text-blanc-casse py-24">
      <Container className="text-center max-w-2xl mx-auto">
        <Reveal>
          <span className="text-[12px] uppercase tracking-[0.25em] text-dore">
            {t("eyebrow")}
          </span>
          <h2 className="mt-5 font-display text-3xl md:text-4xl leading-tight">
            {t("title")}
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" className="bg-dore border-dore text-noir hover:bg-transparent hover:text-dore">
              {t("ctaPrimary")}
            </Button>
            <WhatsAppButton className="border-blanc-casse/40 text-blanc-casse hover:bg-dore hover:text-noir hover:border-dore" />
            <Button href={CABINET.telephoneHref} variant="ghost" external>
              {t("ctaCall")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
