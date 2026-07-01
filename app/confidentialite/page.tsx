import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/site"
import ManageCookiesButton from "@/components/manage-cookies-button"

export const metadata: Metadata = {
  title: "Confidentialité & cookies",
  description:
    "Politique de confidentialité et de cookies de Pulsar ICT : données collectées, cookies de mesure d'audience (Google Analytics, Microsoft Clarity) et gestion de votre consentement.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/confidentialite" },
}

export default function ConfidentialitePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
      >
        <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Confidentialité &amp; cookies</h1>
      <p className="mt-3 text-gray-600">
        Cette page explique quelles données sont collectées lorsque vous visitez ce site et comment gérer votre
        consentement aux cookies.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Responsable du traitement</h2>
        <p className="leading-relaxed text-gray-600">
          {siteConfig.legalName}, {siteConfig.address.district} — {siteConfig.address.postalCode}{" "}
          {siteConfig.address.locality}, Suisse.
          <br />
          Contact : <a className="text-blue-700 underline" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> ·{" "}
          {siteConfig.contact.phone}
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Cookies de mesure d'audience</h2>
        <p className="leading-relaxed text-gray-600">
          Avec votre accord, nous utilisons des outils de mesure d'audience pour comprendre l'utilisation du site et
          l'améliorer. Aucun de ces cookies n'est déposé tant que vous n'avez pas cliqué sur « Accepter ».
        </p>
        <div className="overflow-x-auto rounded-xl border border-blue-900/[0.08]">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-3 font-semibold">Outil</th>
                <th className="p-3 font-semibold">Finalité</th>
                <th className="p-3 font-semibold">Fournisseur</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-t border-blue-900/[0.06]">
                <td className="p-3">Google Analytics 4</td>
                <td className="p-3">Statistiques de fréquentation (pages vues, provenance)</td>
                <td className="p-3">Google Ireland Ltd.</td>
              </tr>
              <tr className="border-t border-blue-900/[0.06]">
                <td className="p-3">Microsoft Clarity</td>
                <td className="p-3">Analyse comportementale (cartes de chaleur, sessions)</td>
                <td className="p-3">Microsoft Corp.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Formulaire de contact</h2>
        <p className="leading-relaxed text-gray-600">
          Les informations que vous saisissez dans le formulaire de contact (nom, email, entreprise, message) sont
          utilisées uniquement pour répondre à votre demande et ne sont pas exploitées à des fins publicitaires.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Gérer votre consentement</h2>
        <p className="leading-relaxed text-gray-600">
          Vous pouvez modifier ou retirer votre choix à tout moment. Vous pouvez également supprimer les cookies via les
          réglages de votre navigateur.
        </p>
        <ManageCookiesButton />
      </section>

      <p className="mt-12 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
        Note : ce texte est un modèle informatif. Faites-le valider par un juriste pour garantir sa conformité à la LPD
        suisse (nLPD) et au RGPD.
      </p>
    </main>
  )
}
