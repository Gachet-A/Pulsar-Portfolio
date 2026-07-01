import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string // ISO (YYYY-MM-DD)
  author: string
  category: string
  cover: string
  coverAlt: string
  keywords: string[]
  readingMinutes: number
}

export interface Post extends PostMeta {
  content: string
}

function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null

  const { data, content } = matter(fs.readFileSync(file, "utf8"))

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? String(data.date) : "",
    author: data.author ?? "Pulsar ICT",
    category: data.category ?? "Actualités",
    cover: data.cover ?? "",
    coverAlt: data.coverAlt ?? data.title ?? "",
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    readingMinutes: estimateReadingMinutes(content),
    content,
  }
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPostBySlug)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
