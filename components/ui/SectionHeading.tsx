import clsx from "clsx";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  light,
  align = "left",
}: {
  index?: number;
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div
        className={clsx(
          "flex items-center gap-3 text-[12px] uppercase tracking-[0.25em]",
          align === "center" && "justify-center",
          light ? "text-dore" : "text-dore-fonce"
        )}
      >
        {typeof index === "number" && (
          <span className="font-display italic text-base">{ROMAN[index]}.</span>
        )}
        <span>{eyebrow}</span>
      </div>
      <h2
        className={clsx(
          "mt-4 font-display text-3xl md:text-4xl leading-[1.15]",
          light ? "text-blanc-casse" : "text-noir"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-4 text-[15px] leading-relaxed",
            light ? "text-blanc-casse/70" : "text-noir/65"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
