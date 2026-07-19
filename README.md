# Site — Maître Abdelkader Fejjar, Avocat à Casablanca

Site premium bilingue (français / arabe) développé avec Next.js (App
Router), TypeScript, Tailwind CSS, Framer Motion et next-intl.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript strict
- Tailwind CSS v4
- next-intl (routage multilingue, RTL, traductions)
- Framer Motion (animations discrètes)
- React Hook Form + Zod (formulaire de contact)
- Resend (envoi d'e-mails)
- Fontsource : Fraunces / Inter (FR), Amiri / Cairo (AR) — polices
  auto-hébergées, aucune requête vers Google Fonts
- Contenu du blog en MDX/Markdown, lu localement (aucun CMS externe requis)

## Langues

- **Français** — locale par défaut, URLs non préfixées (`/`, `/cabinet`…)
  pour préserver l'historique SEO du site.
- **Arabe** — sous `/ar` (`/ar`, `/ar/cabinet`…), rendu entièrement en RTL
  avec une paire typographique et des réglages d'espacement dédiés.
- Sélecteur de langue dans le header : **Français | العربية**, qui
  conserve la page courante lors du changement de langue.
- Traductions centralisées dans `messages/fr.json` et `messages/ar.json`
  (structure strictement parallèle, vérifiée automatiquement).

## Structure du projet

```
app/[locale]/           Pages (une arborescence, servie en fr et /ar)
                         accueil, cabinet, domaines, domaines/[slug], faq,
                         blog, blog/[slug], contact, mentions légales,
                         politique de confidentialité
app/[locale]/layout.tsx Layout racine : <html lang/dir>, polices, JSON-LD,
                         bouton WhatsApp flottant
app/api/contact/        Route API d'envoi du formulaire (Resend)
app/sitemap.ts          Sitemap multilingue (hreflang par URL)
app/robots.ts           robots.txt
i18n/routing.ts         Définition des locales et de la stratégie de préfixe
i18n/request.ts         Chargement des messages par locale
proxy.ts                Middleware de résolution de langue (next-intl)
messages/fr.json         Traductions françaises
messages/ar.json         Traductions arabes
components/layout/      Header, Footer, LanguageSwitcher
components/sections/    Sections de page (Hero, About, Practice, etc.)
components/ui/          Primitives réutilisables (Button, WhatsAppButton…)
components/forms/       Formulaire de contact
content/blog/           Articles de blog (français)
content/blog-ar/        Traductions arabes des articles (avec repli
                         automatique + mention si un article n'est pas
                         encore traduit)
lib/                    Constantes, schéma de validation, domaines,
                         utilitaires blog, helpers SEO
```

## Prise de rendez-vous

Deux parcours coexistent, partout où un appel à l'action de contact est
proposé :

1. **Par e-mail** — formulaire classique (nom, téléphone, e-mail, objet,
   domaine, message), envoyé via Resend.
2. **Par WhatsApp** — un bouton ouvre une petite fenêtre modale demandant
   nom, téléphone et domaine concerné ; un message professionnel structuré
   est généré automatiquement puis WhatsApp s'ouvre avec ce message
   prérempli vers le numéro officiel du cabinet. Le visiteur n'a
   pratiquement rien à taper dans WhatsApp lui-même.

## Lancer le projet en local

```bash
npm install
npm run dev
```

Le site est accessible sur http://localhost:3000 (français) et
http://localhost:3000/ar (arabe).

## Variables d'environnement

Copiez `.env.example` vers `.env.local` et renseignez votre clé API Resend :

```bash
cp .env.example .env.local
```

Sans cette clé, le formulaire de contact par e-mail renvoie une erreur
côté serveur — le reste du site (y compris la prise de rendez-vous
WhatsApp) fonctionne normalement.

## Déploiement sur Vercel

1. Poussez ce projet sur un dépôt GitHub / GitLab / Bitbucket.
2. Sur [vercel.com](https://vercel.com), cliquez sur **Add New → Project**
   et importez le dépôt.
3. Vercel détecte automatiquement Next.js — aucune configuration
   supplémentaire n'est nécessaire.
4. Dans **Settings → Environment Variables**, ajoutez `RESEND_API_KEY`
   avec votre clé Resend.
5. Déployez. Le site est disponible sur un sous-domaine `*.vercel.app`.
6. Dans **Settings → Domains**, ajoutez votre nom de domaine définitif
   (ex. `fejjar-avocat.ma`) et suivez les instructions DNS fournies par
   Vercel.
7. Vérifiez que `siteUrl` dans `lib/constants.ts` correspond bien au nom
   de domaine définitif (utilisé pour le SEO, le sitemap et les données
   structurées, dans les deux langues).

## Avant la mise en production — points à valider avec le client

- [ ] Remplacer les chiffres clés placeholder (`messages/*.json →
      stats.items`) par les données réelles du cabinet.
- [ ] Ajouter les photographies définitives (portrait de Maître Fejjar,
      cabinet) dans `public/images/`.
- [ ] Configurer un compte Resend avec un domaine d'envoi vérifié
      (`site@fejjar-avocat.ma`) pour la délivrabilité des e-mails.
- [ ] Relire et valider les traductions arabes avec un locuteur natif /
      juriste marocain, en particulier les pages juridiques (mentions
      légales, politique de confidentialité).
- [ ] Traduire les articles de blog restants en arabe au fil du temps
      (`content/blog-ar/` — tant qu'un article n'a pas de traduction, la
      version arabe affiche automatiquement l'article français avec une
      mention explicite).
- [ ] Vérifier l'intégration Google Maps sur la page Contact (adresse
      exacte du cabinet).

## Qualité

- Build de production validé (`npm run build`) — 46 pages générées
  statiquement (18 pages × 2 langues + racine, blog et domaines
  dynamiques inclus).
- ESLint et TypeScript strict sans erreur.
- Toutes les routes testées (200 OK) en français et en arabe, y compris
  `/sitemap.xml` (multilingue, avec hreflang) et `/robots.txt`.
- Redirections 301 en place pour les anciennes URLs de domaines
  restructurées (`/domaines/divorce`, `/domaines/droit-des-affaires`),
  en français comme en arabe — aucune perte de référencement.
- Chaque page dispose de son propre `canonical`, de ses balises
  `hreflang` et de ses métadonnées Open Graph / Twitter Card dédiées.
- HTML sémantique, focus visibles, navigation clavier,
  `prefers-reduced-motion` respecté, propriétés CSS logiques (RTL natif,
  pas de mise en miroir approximative).
