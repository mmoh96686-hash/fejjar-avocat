"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { CABINET, getCabinetName } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");

  const NAV = [
    { href: "/cabinet", label: t("cabinet") },
    { href: "/domaines", label: t("domaines") },
    { href: "/blog", label: t("blog") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-blanc-casse/95 backdrop-blur-sm border-b border-noir/10">
      <Container className="flex items-center justify-between py-5 gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Logo — Cabinet d'Avocat Maître Abdelkader Fejjar"
            width={44}
            height={44}
            className="rounded-full shrink-0"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg md:text-xl tracking-wide">
              {getCabinetName(locale)}
            </span>
            <span className="text-[11px]  tracking-[0.2em] text-dore-fonce">
              {tHeader("tagline")}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] uppercase tracking-[0.1em] text-noir/80 hover:text-dore-fonce transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <LanguageSwitcher className="text-noir/70" />
          <a
            href={CABINET.telephoneHref}
            className="flex items-center gap-2 text-[13px] tracking-wide text-noir/80 hover:text-dore-fonce transition-colors"
          >
            <Phone size={15} strokeWidth={1.5} />
            <bdi dir="ltr">{CABINET.telephone}</bdi>
          </a>
          <WhatsAppButton variant="inline" className="px-4 py-2.5" />
          <Button href="/contact" variant="primary">
            {t("bookAppointment")}
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher className="text-noir/70 text-[10px] gap-1.5" />
          <button
            aria-label={open ? tHeader("closeMenu") : tHeader("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-noir/10 bg-blanc-casse">
          <Container className="py-6 flex flex-col gap-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.1em] text-noir/85"
              >
                {item.label}
              </Link>
            ))}
            <a href={CABINET.telephoneHref} className="text-sm text-noir/85">
              <bdi dir="ltr">{CABINET.telephone}</bdi>
            </a>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton variant="inline" />
              <Button href="/contact" variant="primary" className="w-fit">
                {t("bookAppointment")}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
