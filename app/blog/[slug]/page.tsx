import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog"
import { siteConfig } from "@/lib/site"

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

function formatDate(iso: string): string {
  if (!iso) return ""
  return new Intl.DateTimeFormat("fr-CH", { dateStyle: "long" }).format(new Date(iso))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `${siteConfig.url}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [post.author],
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.cover ? [post.cover] : undefined,
    },
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const others = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.cover || undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    inLanguage: "fr-CH",
  }

  return (
    <main className="relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
        >
          <ArrowLeft className="h-4 w-4" /> Tous les articles
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingMinutes} min de lecture</span>
        </div>

        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-gray-900 md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.description}</p>

        {post.cover && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt={post.coverAlt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-blue-800/30 mix-blend-multiply" />
          </div>
        )}

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-700 prose-a:font-medium prose-strong:text-gray-900 prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:not-italic prose-li:marker:text-blue-600">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 p-8 text-center text-white">
          <h2 className="text-xl font-semibold">Une question sur votre informatique ?</h2>
          <p className="mx-auto mt-2 max-w-md text-blue-100/80">
            Notre équipe genevoise vous accompagne. Le premier audit est gratuit.
          </p>
          <Link
            href="/#contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-900 transition-transform hover:scale-105"
          >
            Contactez-nous
          </Link>
        </div>

        {others.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-lg font-semibold tracking-tight text-gray-900">À lire aussi</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="surface-card group flex flex-col p-5 transition-colors hover:border-blue-300/60"
                >
                  <span className="mb-2 text-xs font-medium text-blue-700">{p.category}</span>
                  <span className="font-semibold leading-snug text-gray-900 transition-colors group-hover:text-blue-700">
                    {p.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  )
}
