"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { MessageCircle, X } from "lucide-react";
import clsx from "clsx";
import { CABINET } from "@/lib/constants";

type DomainItem = { nom: string };

function buildWhatsAppMessage(
  t: ReturnType<typeof useTranslations<"whatsapp">>,
  name: string,
  phone: string,
  domainNom: string
) {
  const lines = [
    t("message.greeting"),
    "",
    t("message.intro"),
    "",
    t("message.nameLabel"),
    name,
    "",
    t("message.phoneLabel"),
    phone,
    "",
    t("message.domainLabel"),
    domainNom,
    "",
    t("message.outro"),
  ];
  return lines.join("\n");
}

const inputCls =
  "w-full bg-transparent border-b border-noir/25 focus:border-dore py-3 text-[15px] outline-none transition-colors placeholder:text-noir/35";

const labelCls = "text-[12px] uppercase tracking-[0.12em] text-noir/55";

function WhatsAppModal({
  onClose,
  initialDomainSlug,
}: {
  onClose: () => void;
  initialDomainSlug?: string;
}) {
  const t = useTranslations("whatsapp");
  const td = useTranslations("domains");
  const order = td.raw("order") as string[];
  const items = td.raw("items") as Record<string, DomainItem>;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [domainSlug, setDomainSlug] = useState(initialDomainSlug ?? "");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; domain?: string }>({});

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (name.trim().length < 2) nextErrors.name = t("modal.errorName");
    if (phone.trim().length < 8) nextErrors.phone = t("modal.errorPhone");
    if (!domainSlug) nextErrors.domain = t("modal.errorDomain");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const domainNom = items[domainSlug]?.nom ?? "";
    const message = buildWhatsAppMessage(t, name.trim(), phone.trim(), domainNom);
    const url = `https://wa.me/${CABINET.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-noir/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-modal-title"
        className="relative w-full max-w-md bg-blanc-casse border border-dore/30 shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("modal.close")}
          className="absolute top-5 end-5 text-noir/40 hover:text-dore-fonce transition-colors"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-dore-fonce">
          <MessageCircle size={15} strokeWidth={1.5} />
          {t("buttonLabel")}
        </div>
        <h2 id="whatsapp-modal-title" className="mt-3 font-display text-2xl">
          {t("modal.title")}
        </h2>
        <p className="mt-2 text-sm text-noir/60 leading-relaxed">
          {t("modal.description")}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <div>
            <label htmlFor="wa-name" className={labelCls}>{t("modal.nameLabel")}</label>
            <input
              id="wa-name"
              className={inputCls}
              placeholder={t("modal.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="wa-phone" className={labelCls}>{t("modal.phoneLabel")}</label>
            <input
              id="wa-phone"
              type="tel"
              className={inputCls}
              placeholder={t("modal.phonePlaceholder")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="wa-domain" className={labelCls}>{t("modal.domainLabel")}</label>
            <select
              id="wa-domain"
              className={inputCls}
              value={domainSlug}
              onChange={(e) => setDomainSlug(e.target.value)}
            >
              <option value="" disabled>{t("modal.domainPlaceholder")}</option>
              {order.map((slug) => (
                <option key={slug} value={slug}>{items[slug]?.nom}</option>
              ))}
            </select>
            {errors.domain && <p className="mt-1 text-xs text-red-700">{errors.domain}</p>}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-noir text-blanc-casse px-7 py-3.5 text-[13px] uppercase tracking-[0.12em] hover:bg-dore hover:text-noir transition-colors"
            >
              <MessageCircle size={15} strokeWidth={1.5} />
              {t("modal.submit")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-7 py-3.5 text-[13px] uppercase tracking-[0.12em] text-noir/55 hover:text-dore-fonce transition-colors"
            >
              {t("modal.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const emptySubscribe = () => () => {};

/** SSR-safe "is this running on the client" check, without the cascading
 * re-render caused by calling setState inside a mount effect. */
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function WhatsAppButton({
  domainSlug,
  variant = "inline",
  className,
}: {
  /** Pre-selects this domain in the modal (e.g. on a domain detail page). */
  domainSlug?: string;
  variant?: "inline" | "floating";
  className?: string;
}) {
  const t = useTranslations("whatsapp");
  const [open, setOpen] = useState(false);
  const mounted = useIsMounted();

  const modal =
    mounted && open
      ? createPortal(
          <WhatsAppModal onClose={() => setOpen(false)} initialDomainSlug={domainSlug} />,
          document.body
        )
      : null;

  if (variant === "floating") {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("floatingAriaLabel")}
          className="fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-noir text-dore border border-dore/50 shadow-lg shadow-black/20 hover:bg-dore hover:text-noir transition-colors"
        >
          <MessageCircle size={24} strokeWidth={1.5} />
        </button>
        {modal}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={clsx(
          "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[13px] tracking-[0.12em] uppercase transition-colors duration-300 border border-dore text-dore-fonce hover:bg-dore hover:text-noir",
          className
        )}
      >
        <MessageCircle size={15} strokeWidth={1.5} />
        {t("buttonLabel")}
      </button>
      {modal}
    </>
  );
}
