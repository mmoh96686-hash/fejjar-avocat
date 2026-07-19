import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getAllPosts, formatDate } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  return buildPageMetadata({
    locale,
    pathname: "/blog",
    title: t("eyebrow"),
    description: t("description"),
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("blogPage");
  const posts = getAllPosts(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-x-10">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.04}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 border-t border-noir/10"
                >
                  <div className="max-w-2xl">
                    <span className="text-[11px]  tracking-[0.15em] text-dore-fonce">
                      {post.domaine} · {formatDate(post.date, locale as Locale)}
                    </span>
                    <h2 className="mt-2 font-display text-2xl group-hover:text-dore-fonce transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-noir/60 leading-relaxed">
                      {post.excerpt}
                    </p>
                    {post.isFallback && (
                      <p className="mt-2 text-xs text-noir/40 italic">
                        {t("frenchOnlyNotice")}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-noir/30 group-hover:text-dore-fonce group-hover:translate-x-1 group-hover:-translate-y-1 transition-all rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
