import { z } from "zod";

/**
 * Builds the contact-form validation schema. Pass a translator scoped to
 * the `contactForm.errors` namespace to localize validation messages
 * client-side; omitted on the server, where messages are never surfaced
 * to the visitor (client-side validation already ran).
 */
export function buildContactSchema(t?: (key: string) => string) {
  const msg = (key: string, fallback: string) => (t ? t(key) : fallback);

  return z.object({
    nom: z.string().min(2, msg("nom", "Veuillez indiquer votre nom complet.")),
    email: z.string().email(msg("email", "Adresse e-mail invalide.")),
    telephone: z.string().min(8, msg("telephone", "Veuillez indiquer un numéro valide.")),
    objet: z.string().min(3, msg("objet", "Veuillez préciser l'objet de votre demande.")),
    domaine: z.string().min(1, msg("domaine", "Veuillez sélectionner un domaine.")),
    message: z.string().min(20, msg("message", "Merci de détailler votre demande (20 caractères minimum).")),
    consentement: z.literal(true, {
      message: msg("consentement", "Le consentement est requis pour être recontacté."),
    }),
    // Honeypot anti-spam field — must stay empty.
    societe: z.string().max(0).optional().or(z.literal("")),
  });
}

export const contactSchema = buildContactSchema();
export type ContactFormValues = z.infer<typeof contactSchema>;
