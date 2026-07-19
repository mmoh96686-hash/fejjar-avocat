// Données métier neutres, indépendantes de la langue. Les textes traduits
// (domaines, FAQ, pages, etc.) vivent dans messages/fr.json et messages/ar.json.
export const CABINET = {
  nom: "Maître Abdelkader Fejjar",
  // Nom affiché en contexte arabe (En-tête, métadonnées SEO Open Graph /
  // Schema.org). Le nom propre "Maître Abdelkader Fejjar" reste inchangé en
  // français.
  nomAr: "الأستاذ عبد القادر الفجار",
  titre: "Avocat au Barreau de Casablanca",
  ville: "Casablanca",
  pays: "Maroc",
  adresse: "40, Rue Abou Rakrak, 2ème étage, N°6, Benjdia, Casablanca",
  telephone: "05 22 44 73 51",
  telephoneHref: "tel:+212522447351",
  // Numéro WhatsApp officiel du cabinet, au format international sans "+".
  whatsappNumber: "212522447351",
  email: "fejjar.abdelkader@gmail.com",
  // Le site est consultable en français et en arabe ; les dossiers du
  // cabinet sont traités en langue arabe devant les juridictions marocaines.
  langueTraitementDossiers: "Arabe",
  horaires: "Lundi – Vendredi · 9h00 – 17h00",
  siteUrl: "https://www.fejjar-avocat.ma",
} as const;

/** Returns the cabinet's display name for the given locale. */
export function getCabinetName(locale: string): string {
  return locale === "ar" ? CABINET.nomAr : CABINET.nom;
}
