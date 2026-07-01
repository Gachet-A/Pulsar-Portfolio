import HomeClient, { type FeaturedPost } from "@/components/home-client"
import { getAllPosts } from "@/lib/blog"

export default function Page() {
  const featuredPosts: FeaturedPost[] = getAllPosts()
    .slice(0, 3)
    .map(({ slug, title, description, date, category, cover, coverAlt, readingMinutes }) => ({
      slug,
      title,
      description,
      date,
      category,
      cover,
      coverAlt,
      readingMinutes,
    }))

  return <HomeClient featuredPosts={featuredPosts} />
}
