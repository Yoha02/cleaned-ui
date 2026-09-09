import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function getBlogSlugs(): { slug: string; date: string }[] {
  const contentDir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(contentDir)) return []

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const content = fs.readFileSync(path.join(contentDir, file), 'utf-8')
      const { data } = matter(content)
      return {
        slug: file.replace('.mdx', ''),
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      }
    })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aprilio.ai'
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/experience`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/architecture`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/work-with-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const blogPages: MetadataRoute.Sitemap = getBlogSlugs().map(({ slug, date }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
