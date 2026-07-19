"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";

export type FAQItem = { question: string; reponse: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-noir/10 border-t border-b border-noir/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-start"
            >
              <span className="font-display text-lg">{item.question}</span>
              <Plus
                size={18}
                strokeWidth={1.5}
                className={clsx(
                  "shrink-0 text-dore-fonce transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
              />
            </button>
            <div
              className={clsx(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              )}
              style={{ display: "grid" }}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-noir/65 max-w-2xl">
                  {item.reponse}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
