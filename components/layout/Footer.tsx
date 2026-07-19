import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { CABINET, getCabinetName } from "@/lib/constants";
import { buildDomaines } from "@/lib/domains";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const tDomains = await getTranslations("domains");

  const domaines = buildDomaines(
    tDomains.raw("order"),
    tDomains.raw("items")
  ).slice(0, 7); // all real domains, excluding "Autre"

  return (
    <footer className="bg-noir text-blanc-casse">
      <Container className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Logo — Cabinet d'Avocat Maître Abdelkader Fejjar"
              width={52}
              height={52}
              className="rounded-full shrink-0"
            />
            <span className="font-display text-2xl">{getCabinetName(locale)}</span>
          </div>
          <p className="mt-4 text-sm text-blanc-casse/60 max-w-sm leading-relaxed">
            {t("intro")}
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-blanc-casse/75">
            <a href={CABINET.telephoneHref} className="flex items-center gap-3 hover:text-dore transition-colors">
              <Phone size={15} strokeWidth={1.5} /> <bdi dir="ltr">{CABINET.telephone}</bdi>
            </a>
            <a href={`mailto:${CABINET.email}`} className="flex items-center gap-3 hover:text-dore transition-colors">
              <Mail size={15} strokeWidth={1.5} /> {CABINET.email}
            </a>
            <span className="flex items-start gap-3">
              <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              {CABINET.adresse}
            </span>
            <span className="text-blanc-casse/50">{tCommon("hours")}</span>
          </div>
        </div>

        <div>
          <h3 className="text-[12px] uppercase tracking-[0.2em] text-dore">
            {t("domainesTitle")}
          </h3>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-blanc-casse/70">
            {domaines.map((d) => (
              <li key={d.slug}>
                <Link href={`/domaines/${d.slug}`} className="hover:text-blanc-casse transition-colors">
                  {d.nom}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[12px] uppercase tracking-[0.2em] text-dore">
            {t("cabinetTitle")}
          </h3>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-blanc-casse/70">
            <li><Link href="/cabinet" className="hover:text-blanc-casse transition-colors">{tNav("cabinet")}</Link></li>
            <li><Link href="/domaines" className="hover:text-blanc-casse transition-colors">{tNav("domaines")}</Link></li>
            <li><Link href="/blog" className="hover:text-blanc-casse transition-colors">{tNav("blog")}</Link></li>
            <li><Link href="/faq" className="hover:text-blanc-casse transition-colors">{tNav("faq")}</Link></li>
            <li><Link href="/contact" className="hover:text-blanc-casse transition-colors">{tNav("contact")}</Link></li>
          </ul>
        </div>
      </Container>

      <div className="hairline-solid" />

      <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-blanc-casse/50">
        <span>© {new Date().getFullYear()} {getCabinetName(locale)}. {t("rights")}</span>
        <div className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-blanc-casse/80">{t("mentionsLegales")}</Link>
          <Link href="/politique-confidentialite" className="hover:text-blanc-casse/80">{t("politiqueConfidentialite")}</Link>
        </div>
      </Container>
    </footer>
  );
}
