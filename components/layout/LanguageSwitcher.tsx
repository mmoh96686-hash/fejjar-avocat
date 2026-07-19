"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, routing } from "@/i18n/routing";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`flex items-center gap-2 text-[12px] uppercase tracking-[0.08em] ${className ?? ""}`}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-current/25" aria-hidden="true">|</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={locale === l ? "true" : undefined}
            className={
              l === locale
                ? "text-dore font-medium"
                : "opacity-60 hover:opacity-100 transition-opacity"
            }
          >
            {l === "fr" ? "Français" : "العربية"}
          </button>
        </span>
      ))}
    </div>
  );
}
