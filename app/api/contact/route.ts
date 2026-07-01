import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

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

  return NextResponse.json({ ok: true })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
