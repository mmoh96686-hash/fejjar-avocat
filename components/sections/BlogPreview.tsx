import { ArrowUpRight } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getAllPosts, formatDate } from "@/lib/blog";

export async function BlogPreview() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("blogPreview");
  const posts = getAllPosts(locale).slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-anthracite text-blanc-casse">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <Reveal>
            <SectionHeading
              index={5}
              eyebrow={t("eyebrow")}
              title={t("title")}
              light
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/blog" variant="ghost">
              {t("ctaAll")}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="border-t border-blanc-casse/15 pt-6 h-full flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-dore">
                    {post.domaine}
                  </span>
                  <h3 className="mt-3 font-display text-xl leading-snug group-hover:text-dore transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-blanc-casse/55 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] text-blanc-casse/45">
                    {formatDate(post.date, locale)}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:group-hover:-translate-x-0.5"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
