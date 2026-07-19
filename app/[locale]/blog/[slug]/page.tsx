import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getAllPosts, getPostBySlug, renderMarkdown, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts("fr").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale as Locale, slug);
  if (!post) return {};
  const base = buildPageMetadata({
    locale,
    pathname: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
  });

  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const post = getPostBySlug(locale as Locale, slug);
  if (!post) notFound();

  const t = await getTranslations("blogPage");
  const html = renderMarkdown(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: post.isFallback ? "fr" : locale,
    author: { "@type": "Person", name: "Maître Abdelkader Fejjar" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={`${post.domaine} · ${formatDate(post.date, locale as Locale)}`}
        title={post.title}
      />

      <section className="py-20 md:py-28">
        <Container className="max-w-2xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.1em] text-noir/55 hover:text-dore-fonce transition-colors"
          >
            <ArrowLeft size={15} strokeWidth={1.5} className="rtl:rotate-180" />
            {t("backToBlog")}
          </Link>

          {post.isFallback && (
            <p className="mt-6 border border-dore/30 bg-dore/5 px-5 py-4 text-sm text-noir/60 italic">
              {t("frenchOnlyNotice")}
            </p>
          )}

          <article
            className="mt-10 prose-legal"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
