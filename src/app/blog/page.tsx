import { getAllArticles } from '@/lib/articles'
import BlogListClient from './BlogListClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technical Journal',
  description: 'Curated technical writing on AI ontology, taxonomy, grounded retrieval, and structural medical intelligence.',
}

export default function BlogPage() {
  const articles = getAllArticles()
  const categories = Array.from(new Set(articles.map((a) => a.category)))

  return <BlogListClient articles={articles} categories={categories} />
}
