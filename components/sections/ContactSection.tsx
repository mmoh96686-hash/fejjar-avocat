import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CABINET } from "@/lib/constants";

export async function ContactSection() {
  const t = await getTranslations("contactSection");
  const tContact = await getTranslations("contactPage");
  const tCommon = await getTranslations("common");

  return (
    <section id="contact" className="py-24 md:py-32">
      <Container className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16">
        <Reveal>
          <SectionHeading
            index={6}
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />

          <div className="mt-10 space-y-4 text-sm text-noir/70">
            <a href={CABINET.telephoneHref} className="flex items-center gap-3 hover:text-dore-fonce transition-colors">
              <Phone size={16} strokeWidth={1.5} /> <bdi dir="ltr">{CABINET.telephone}</bdi>
            </a>
            <a href={`mailto:${CABINET.email}`} className="flex items-center gap-3 hover:text-dore-fonce transition-colors">
              <Mail size={16} strokeWidth={1.5} /> {CABINET.email}
            </a>
            <span className="flex items-start gap-3">
              <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              {CABINET.adresse}
            </span>
            <span className="flex items-center gap-3">
              <Clock size={16} strokeWidth={1.5} /> {tCommon("hours")}
            </span>
          </div>

          <WhatsAppButton className="mt-8" />
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
          <div className="mt-6 flex items-center gap-4 text-[12px] uppercase tracking-[0.1em] text-noir/40">
            <span className="hairline-solid flex-1" />
            {tContact("orDivider")}
            <span className="hairline-solid flex-1" />
          </div>
          <WhatsAppButton className="mt-6 w-full justify-center" />
        </Reveal>
      </Container>
    </section>
  );
}
