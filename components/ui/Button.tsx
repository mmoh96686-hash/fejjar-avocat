import { Link } from "@/i18n/routing";
import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[13px] tracking-[0.12em] uppercase transition-colors duration-300 border";

  const styles = {
    primary:
      "bg-noir text-blanc-casse border-noir hover:bg-dore hover:border-dore hover:text-noir",
    secondary:
      "bg-transparent text-noir border-noir hover:bg-noir hover:text-blanc-casse",
    ghost:
      "bg-transparent text-blanc-casse border-blanc-casse/40 hover:border-dore hover:text-dore",
  };

  const cls = clsx(base, styles[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
