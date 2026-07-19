"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CABINET } from "@/lib/constants";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative bg-noir text-blanc-casse overflow-hidden">
      <Container className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-[12px] uppercase tracking-[0.25em] text-dore"
          >
            <span className="hairline-solid w-8" />
            {t("eyebrow")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[2.5rem] leading-[1.1] md:text-6xl md:leading-[1.08]"
          >
            {t("titleLine1")}
            <br />
            <span className="italic text-dore">{t("titleLine2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-blanc-casse/65"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href="/contact" variant="primary" className="bg-dore border-dore text-noir hover:bg-transparent hover:text-dore">
              {t("ctaPrimary")}
            </Button>
            <WhatsAppButton variant="inline" className="border-dore/60 text-dore hover:bg-dore hover:text-noir" />
            <Button href={CABINET.telephoneHref} variant="ghost" external>
              <bdi dir="ltr">{CABINET.telephone}</bdi>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex items-center gap-8 text-[12px] uppercase tracking-[0.15em] text-blanc-casse/45"
          >
            <span>{locale === "ar" ? "الدار البيضاء، المغرب" : "Casablanca, Maroc"}</span>
            <span className="hairline-solid w-6" />
            <span>{t("tagRight")}</span>
          </motion.div>
        </div>

        {/* Signature element: architectural line-art with animated gold measuring line */}
        <div className="relative hidden lg:block">
          <svg
            viewBox="0 0 400 520"
            fill="none"
            className="w-full h-full"
            aria-hidden="true"
          >
            <g stroke="#B08D45" strokeOpacity="0.5" strokeWidth="1">
              <line x1="40" y1="40" x2="360" y2="40" />
              <line x1="40" y1="40" x2="40" y2="480" />
              <line x1="360" y1="40" x2="360" y2="480" />
              <line x1="40" y1="480" x2="360" y2="480" />
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={i}
                  x1={70 + i * 40}
                  y1="80"
                  x2={70 + i * 40}
                  y2="480"
                  strokeOpacity="0.28"
                />
              ))}
              <line x1="40" y1="120" x2="360" y2="120" strokeOpacity="0.28" />
              <line x1="40" y1="300" x2="360" y2="300" strokeOpacity="0.28" />
            </g>
            <motion.line
              x1="200"
              y1="0"
              x2="200"
              y2="520"
              stroke="#B08D45"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </Container>

      <div className="hairline-solid" />
    </section>
  );
}
