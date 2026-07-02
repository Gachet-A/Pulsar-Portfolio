import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { siteConfig } from "@/lib/site"

// SMTP sending must run on the Node.js runtime (not the Edge runtime).
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
  }

  const name = String(body.name ?? "").trim()
  const email = String(body.email ?? "").trim()
  const company = String(body.company ?? "").trim()
  const message = String(body.message ?? "").trim()

  // Basic validation (mirrors the client-side `required` fields)
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Veuillez remplir tous les champs obligatoires." }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message trop long." }, { status: 400 })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM, CONTACT_TO } = process.env

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP credentials are not configured (SMTP_USER / SMTP_PASS).")
    return NextResponse.json({ error: "Le service d'envoi n'est pas configuré." }, { status: 500 })
  }

  const port = Number(SMTP_PORT) || 587
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "mail.infomaniak.com",
    port,
    // Infomaniak: port 587 uses STARTTLS (secure=false); port 465 uses implicit TLS (secure=true).
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  // The "From" must be the authenticated mailbox (or one of its aliases),
  // otherwise SPF/DMARC will reject it. The visitor goes in Reply-To.
  const from = CONTACT_FROM || SMTP_USER
  const to = CONTACT_TO || SMTP_USER

  try {
    await transporter.sendMail({
      from: `"Formulaire Pulsar" <${from}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Nouveau message du site${company ? ` — ${company}` : ""}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        `Entreprise : ${company || "—"}`,
        "",
        "Message :",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0a2342">
          <h2 style="margin:0 0 16px">Nouveau message depuis le site Pulsar</h2>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Entreprise :</strong> ${escapeHtml(company) || "—"}</p>
          <p><strong>Message :</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    })
  } catch (err) {
    console.error("Contact form: failed to send email:", err)
    return NextResponse.json({ error: "L'envoi a échoué. Veuillez réessayer plus tard." }, { status: 502 })
  }

  // Best-effort confirmation to the visitor. A failure here must NOT fail the
  // request — the important message (to Pulsar) has already been delivered.
  try {
    await transporter.sendMail({
      from: `"${siteConfig.name}" <${from}>`,
      to: email,
      replyTo: to,
      subject: `Merci pour votre message — ${siteConfig.name}`,
      text: confirmationText(name, message),
      html: confirmationHtml(name, message),
    })
  } catch (err) {
    console.error("Contact form: failed to send confirmation email:", err)
  }

  return NextResponse.json({ ok: true })
}

function confirmationText(name: string, message: string): string {
  const s = siteConfig
  return [
    `Bonjour ${name},`,
    "",
    "Merci de nous avoir contactés. Nous avons bien reçu votre message et notre équipe vous répondra dans les plus brefs délais (généralement sous 24 heures ouvrées).",
    "",
    "Votre message :",
    message,
    "",
    `Pour toute urgence, joignez-nous directement : ${s.contact.phone} · ${s.contact.email}`,
    "",
    "À très bientôt,",
    "L'équipe Pulsar ICT",
    "",
    `Pulsar ICT · CH-${s.address.postalCode} ${s.address.locality} (${s.address.district}) · ${s.url}`,
  ].join("\n")
}

function confirmationHtml(name: string, message: string): string {
  const s = siteConfig
  const year = new Date().getFullYear()
  const domain = s.url.replace(/^https?:\/\//, "")
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Merci pour votre message</title></head>
<body style="margin:0;padding:0;background:#eef2f7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(2,6,23,0.08);font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr><td style="background:#0a2342;padding:28px 32px;">
          <div style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:.3px;">Pulsar ICT</div>
          <div style="font-size:12px;color:#7dd3fc;margin-top:6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.5px;">INFOG&Eacute;RANCE &middot; CYBERS&Eacute;CURIT&Eacute; &middot; GEN&Egrave;VE</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 14px;font-size:20px;font-weight:700;color:#0f172a;">Merci, ${escapeHtml(name)} !</h1>
          <p style="margin:0 0 8px;font-size:15px;line-height:1.65;color:#475569;">
            Nous avons bien re&ccedil;u votre message et notre &eacute;quipe vous r&eacute;pondra dans les plus brefs d&eacute;lais&nbsp;&mdash; g&eacute;n&eacute;ralement sous <strong style="color:#0f172a;">24&nbsp;heures ouvr&eacute;es</strong>.
          </p>
          <div style="border-left:3px solid #0891b2;background:#f8fafc;border-radius:0 10px 10px 0;padding:16px 18px;margin:22px 0;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#0891b2;font-weight:700;margin-bottom:8px;">Votre message</div>
            <div style="font-size:14px;line-height:1.65;color:#334155;white-space:pre-wrap;">${escapeHtml(message)}</div>
          </div>
          <p style="margin:20px 0 6px;font-size:15px;line-height:1.65;color:#475569;">Une urgence&nbsp;? Joignez-nous directement&nbsp;:</p>
          <p style="margin:0;font-size:15px;line-height:1.9;color:#0f172a;">
            <a href="tel:${s.contact.phoneE164}" style="color:#1e40af;text-decoration:none;font-weight:600;">${s.contact.phone}</a><br>
            <a href="mailto:${s.contact.email}" style="color:#1e40af;text-decoration:none;font-weight:600;">${s.contact.email}</a>
          </p>
          <p style="margin:26px 0 0;font-size:15px;line-height:1.6;color:#475569;">
            &Agrave; tr&egrave;s bient&ocirc;t,<br><strong style="color:#0f172a;">L'&eacute;quipe Pulsar ICT</strong>
          </p>
        </td></tr>
        <tr><td style="padding:22px 32px;border-top:1px solid #e6ebf2;background:#fafbfc;">
          <div style="font-size:12px;color:#94a3b8;line-height:1.7;">
            Pulsar ICT &middot; CH-${s.address.postalCode} ${escapeHtml(s.address.locality)} (${escapeHtml(s.address.district)})<br>
            <a href="${s.url}" style="color:#64748b;text-decoration:none;">${domain}</a> &middot; &copy; ${year} Pulsar ICT
          </div>
        </td></tr>
      </table>
      <div style="max-width:600px;font-size:11px;color:#a0aec0;margin:16px auto 0;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.5;">
        Cet e-mail automatique confirme l'envoi de votre demande via le formulaire de contact de ${domain}.
      </div>
    </td></tr>
  </table>
</body></html>`
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
