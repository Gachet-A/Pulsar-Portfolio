import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Home, Newspaper } from "lucide-react"

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <div className="hero-glow absolute inset-0" />
      <div className="circuit-bg absolute inset-0" />
      <div className="dot-grid absolute inset-0 opacity-20" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p className="label-mono justify-center text-blue-600">// Erreur 404</p>

          <h1 className="mt-4 font-heading text-7xl font-bold tracking-tight text-gradient md:text-8xl">404</h1>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">Page introuvable</h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            La page que vous recherchez n'existe pas ou a été déplacée. Vérifiez l'adresse ou revenez à l'accueil.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              <Home className="h-4 w-4" />
              Retour à l'accueil
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-900/10 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-300/60 hover:text-blue-800"
            >
              <Newspaper className="h-4 w-4" />
              Voir le blog
            </Link>
          </div>

          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Besoin d'aide ? Contactez-nous
          </Link>
        </div>
      </div>
    </main>
  )
}
