import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CABINET } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return buildPageMetadata({
    locale,
    pathname: "/contact",
    title: t("eyebrow"),
    description: t("description"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("contactPage");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <section className="py-24 md:py-32">
        <Container className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16">
          <Reveal>
            <div className="space-y-8">
              <div className="space-y-4 text-sm text-noir/70">
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

              <WhatsAppButton className="w-full justify-center sm:w-fit" />

              <div className="aspect-[4/3] w-full border border-noir/10 overflow-hidden">
                <iframe
                  title={t("mapTitle")}
                  className="w-full h-full grayscale"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=40+Rue+Abou+Rakrak+Benjdia+Casablanca&output=embed"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
            <div className="mt-6 flex items-center gap-4 text-[12px] uppercase tracking-[0.1em] text-noir/40">
              <span className="hairline-solid flex-1" />
              {t("orDivider")}
              <span className="hairline-solid flex-1" />
            </div>
            <WhatsAppButton className="mt-6 w-full justify-center" />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
