export type Domaine = {
  slug: string;
  nom: string;
  resume: string;
  description: string;
  prestations: string[];
};

type DomaineContent = Omit<Domaine, "slug">;

/**
 * Builds the ordered, localized domain list from the `domains` namespace of
 * the active locale's messages (see messages/fr.json and messages/ar.json).
 * Pass the result of `t.raw("order")` and `t.raw("items")` from a
 * `useTranslations("domains")` / `getTranslations("domains")` call.
 */
export function buildDomaines(
  order: string[],
  items: Record<string, DomaineContent>
): Domaine[] {
  return order.map((slug) => ({ slug, ...items[slug] }));
}
