import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schema";
import { CABINET } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { nom, email, telephone, objet, domaine, message, societe } = parsed.data;

    // Protection anti-spam : un champ honeypot rempli signale un robot.
    // On répond succès pour ne pas révéler la détection, sans envoyer d'e-mail.
    if (societe) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Fail gracefully in environments without an API key configured yet.
      console.error("RESEND_API_KEY manquante — email non envoyé.");
      return NextResponse.json(
        { error: "Configuration serveur incomplète." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Site Cabinet Fejjar <site@fejjar-avocat.ma>",
      to: CABINET.email,
      replyTo: email,
      subject: `Demande de rendez-vous — ${objet} — ${nom}`,
      text: [
        `Nom complet : ${nom}`,
        `Téléphone : ${telephone}`,
        `E-mail : ${email}`,
        `Objet : ${objet}`,
        `Domaine juridique : ${domaine}`,
        "",
        "Message :",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
