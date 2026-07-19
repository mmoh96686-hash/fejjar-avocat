"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { buildContactSchema, ContactFormValues } from "@/lib/schema";
import { buildDomaines } from "@/lib/domains";

const inputCls =
  "w-full bg-transparent border-b border-noir/25 focus:border-dore py-3 text-[15px] outline-none transition-colors placeholder:text-noir/35";

const labelCls = "text-[12px] uppercase tracking-[0.12em] text-noir/55";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const t = useTranslations("contactForm");
  const td = useTranslations("domains");
  const domaines = buildDomaines(
    td.raw("order") as string[],
    td.raw("items") as Record<string, { nom: string; resume: string; description: string; prestations: string[] }>
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(buildContactSchema((key) => t(`errors.${key}`))),
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Échec de l'envoi");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 border border-dore/40 p-8">
        <CheckCircle2 className="text-dore-fonce" size={28} strokeWidth={1.5} />
        <h3 className="font-display text-xl">{t("successTitle")}</h3>
        <p className="text-sm text-noir/60">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      {/* Honeypot anti-spam : champ invisible pour les visiteurs humains,
          souvent rempli automatiquement par les robots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="societe">Société</label>
        <input
          id="societe"
          tabIndex={-1}
          autoComplete="off"
          {...register("societe")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label htmlFor="nom" className={labelCls}>{t("nom")}</label>
          <input id="nom" className={inputCls} {...register("nom")} />
          {errors.nom && <p className="mt-1 text-xs text-red-700">{errors.nom.message}</p>}
        </div>
        <div>
          <label htmlFor="telephone" className={labelCls}>{t("telephone")}</label>
          <input id="telephone" className={inputCls} {...register("telephone")} />
          {errors.telephone && <p className="mt-1 text-xs text-red-700">{errors.telephone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>{t("email")}</label>
        <input id="email" type="email" className={inputCls} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="objet" className={labelCls}>{t("objet")}</label>
        <input id="objet" className={inputCls} placeholder={t("objetPlaceholder")} {...register("objet")} />
        {errors.objet && <p className="mt-1 text-xs text-red-700">{errors.objet.message}</p>}
      </div>

      <div>
        <label htmlFor="domaine" className={labelCls}>{t("domaine")}</label>
        <select id="domaine" className={inputCls} defaultValue="" {...register("domaine")}>
          <option value="" disabled>{t("domaineSelect")}</option>
          {domaines.map((d) => (
            <option key={d.slug} value={d.nom}>{d.nom}</option>
          ))}
        </select>
        {errors.domaine && <p className="mt-1 text-xs text-red-700">{errors.domaine.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>{t("message")}</label>
        <textarea id="message" rows={5} className={inputCls} {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-700">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consentement"
          type="checkbox"
          className="mt-1 accent-[#B08D45]"
          {...register("consentement")}
        />
        <label htmlFor="consentement" className="text-xs text-noir/55 leading-relaxed">
          {t("consent")}{" "}
          <Link href="/politique-confidentialite" className="underline hover:text-dore-fonce">
            {t("consentLink")}
          </Link>
          .
        </label>
      </div>
      {errors.consentement && (
        <p className="text-xs text-red-700 -mt-4">{errors.consentement.message}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 bg-noir text-blanc-casse px-8 py-4 text-[13px] uppercase tracking-[0.12em] hover:bg-dore hover:text-noir transition-colors disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="animate-spin" size={16} />}
        {status === "loading" ? t("sending") : t("submit")}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-700">{t("errorText")}</p>
      )}
    </form>
  );
}
