import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Blog — Infogérance & cybersécurité pour les PME",
  description:
    "Conseils pratiques en infogérance, cybersécurité, cloud et téléphonie pour les PME de Genève et de Suisse romande. Des explications claires par les experts de Pulsar ICT.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: `Blog — ${siteConfig.name}`,
    description:
      "Conseils pratiques en infogérance, cybersécurité, cloud et téléphonie pour les PME de Genève et de Suisse romande.",
    url: `${siteConfig.url}/blog`,
  },
}

function formatDate(iso: string): string {
  if (!iso) return ""
  return new Intl.DateTimeFormat("fr-CH", { dateStyle: "long" }).format(new Date(iso))
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-40" />

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <header className="mx-auto mb-14 max-w-2xl text-center">
          <p className="label-mono justify-center text-blue-600">// Blog</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Ressources &amp; conseils IT pour les PME
          </h1>
          <p className="mt-4 text-gray-600">
            Infogérance, cybersécurité, cloud et téléphonie — expliqués simplement par notre équipe genevoise.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">Les premiers articles arrivent bientôt.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="surface-card group flex flex-col overflow-hidden transition-colors duration-300 hover:border-blue-300/60 hover:shadow-[0_1px_3px_rgba(15,23,42,0.04),0_24px_48px_-16px_rgba(30,64,175,0.25)]"
              >
                {post.cover && (
                  <div className="relative h-44 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover}
                      alt={post.coverAlt}
                      className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-blue-800/45 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">{post.category}</span>
                    <span>{post.readingMinutes} min</span>
                  </div>
                  <h2 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                    {post.title}
                  </h2>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">{post.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="inline-flex items-center gap-1 font-medium text-blue-700">
                      Lire <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
