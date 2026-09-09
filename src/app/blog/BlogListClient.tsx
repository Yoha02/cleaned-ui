'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Container from '@/components/ui/Container'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import BlogCard from '@/components/BlogCard'
import type { Article } from '@/lib/articles'

const categoryLabels: Record<string, string> = {
  grounded_retrieval: 'Grounded Retrieval',
  ai_medicine: 'AI in Medicine',
  clinical_intelligence: 'Clinical Intelligence',
}

export default function BlogListClient({
  articles,
  categories,
}: {
  articles: Article[]
  categories: string[]
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles

  return (
    <>
      <Navigation variant="research" />
      <main>
        {/* Hero */}
        <section className="hero-light relative overflow-hidden pb-20 pt-32">
          <div className="hero-aurora absolute inset-0 opacity-65" />
          <Container className="relative">
            <AnimateOnScroll>
              <p className="eyebrow mb-4 text-cyan-deep">
                Research notes
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl lg:text-6xl">
                Methods, failure studies, and open questions.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
                Working notes from our research on ontology, source structure, changing evidence, and grounded medical knowledge systems.
              </p>
            </AnimateOnScroll>
          </Container>
        </section>

        {/* Category Filters + Grid */}
        <section className="py-20 bg-bg">
          <Container>
            <AnimateOnScroll>
              <div className="flex flex-wrap items-center gap-2 mb-10">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-2 text-sm rounded-full border transition-colors cursor-pointer ${
                    activeCategory === null
                      ? 'bg-teal/10 border-teal/40 text-teal'
                      : 'border-navy/10 text-text-secondary hover:border-teal/30 hover:text-teal'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-sm rounded-full border transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-teal/10 border-teal/40 text-teal'
                        : 'border-navy/10 text-text-secondary hover:border-teal/30 hover:text-teal'
                    }`}
                  >
                    {categoryLabels[cat] || cat}
                  </button>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory || 'all'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filtered.map((article) => (
                  <BlogCard key={article.slug} article={article} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <p className="text-center text-text-secondary mt-12">
                No articles in this category yet.
              </p>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
