import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-noir text-blanc-casse pt-16 pb-20 md:pt-20 md:pb-24">
      <Container>
        <span className="text-[12px] uppercase tracking-[0.25em] text-dore">
          {eyebrow}
        </span>
        <h1 className="mt-5 font-display text-4xl md:text-5xl leading-[1.1] max-w-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-blanc-casse/65">
            {description}
          </p>
        )}
      </Container>
      <div className="mt-16">
        <div className="hairline-solid" />
      </div>
    </section>
  );
}
