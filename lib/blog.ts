import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";

const DIRS: Record<Locale, string> = {
  fr: path.join(process.cwd(), "content/blog"),
  ar: path.join(process.cwd(), "content/blog-ar"),
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  domaine: string;
  content: string;
  /** True when this post is served in French because no Arabic translation exists yet. */
  isFallback: boolean;
};

function readDir(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

function readPost(dir: string, file: string) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(dir, file), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    domaine: data.domaine as string,
    content,
  };
}

/** All posts for a locale. Falls back to the French post (flagged) when missing in Arabic. */
export function getAllPosts(locale: Locale): BlogPost[] {
  const frFiles = readDir(DIRS.fr);
  const arSlugs = new Set(readDir(DIRS.ar).map((f) => f.replace(/\.mdx$/, "")));

  const posts = frFiles.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    if (locale === "ar" && arSlugs.has(slug)) {
      return { ...readPost(DIRS.ar, `${slug}.mdx`), isFallback: false };
    }
    return { ...readPost(DIRS.fr, file), isFallback: locale === "ar" };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | undefined {
  return getAllPosts(locale).find((p) => p.slug === slug);
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

export function formatDate(date: string, locale: Locale): string {
  return new Date(date).toLocaleDateString(locale === "ar" ? "ar-MA" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
