'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Container from '@/components/ui/Container'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import Badge from '@/components/ui/Badge'
import BlogCard from '@/components/BlogCard'
import type { Article } from '@/lib/articles'
import { formatDateOnly } from '@/lib/dates'

const categoryLabels: Record<string, string> = {
  grounded_retrieval: 'Grounded Retrieval',
  ai_medicine: 'AI in Medicine',
  clinical_intelligence: 'Clinical Intelligence',
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)] mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)] mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-text-secondary leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1 pl-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-text-secondary leading-relaxed mb-4 space-y-1 pl-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-text-secondary" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-teal hover:text-teal-light underline underline-offset-2 transition-colors [overflow-wrap:anywhere]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-teal pl-4 my-6 italic text-text-secondary" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-navy/10">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-navy/5 border-b border-navy/10" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left font-medium text-text-primary" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-text-secondary border-b border-navy/5" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-navy/2" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-dark-surface text-text-on-dark rounded-lg p-4 my-6 overflow-x-auto text-sm font-[family-name:var(--font-mono)]" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-navy/5 text-purple px-1.5 py-0.5 rounded text-sm font-[family-name:var(--font-mono)]" {...props} />
  ),
  sup: (props: React.HTMLAttributes<HTMLElement>) => (
    <sup className="text-teal font-medium text-xs" {...props} />
  ),
}

export default function BlogPostClient({
  article,
  relatedArticles,
}: {
  article: Article
  relatedArticles: Article[]
}) {
  return (
    <>
      <Navigation variant="research" />
      <main>
        {/* Hero */}
        <section className="hero-light relative overflow-hidden pb-16 pt-32">
          <div className="hero-aurora absolute inset-0 opacity-60" />
          <Container className="relative">
            <AnimateOnScroll>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="info">
                  {categoryLabels[article.category] || article.category}
                </Badge>
                <span className="text-sm text-ink-muted">{article.readingTime}</span>
              </div>
              <h1 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <div className="mt-5 flex items-center gap-4 text-sm text-ink-muted">
                <time dateTime={article.date}>
                  {formatDateOnly(article.date)}
                </time>
                <span>&middot;</span>
                <span>{article.author}</span>
              </div>
            </AnimateOnScroll>
          </Container>
        </section>

        {/* Key Takeaways + Content */}
        <section className="py-16 bg-bg">
          <Container>
            <AnimateOnScroll>
              {article.keyTakeaways.length > 0 && (
                <div className="border-l-4 border-teal bg-teal/5 rounded-r-lg p-6 mb-10">
                  <h2 className="text-base font-bold text-text-primary font-[family-name:var(--font-heading)] mb-3">
                    Key Takeaways
                  </h2>
                  <ul className="space-y-2">
                    {article.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                        <span className="text-teal mt-0.5 shrink-0">&#8226;</span>
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <article className="prose-custom max-w-none">
                <MDXRemote
                  source={article.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug],
                    },
                  }}
                />
              </article>
            </AnimateOnScroll>

            {/* Attribution */}
            <AnimateOnScroll delay={0.2}>
              <div className="mt-12 pt-8 border-t border-navy/10">
                <p className="text-sm text-text-tertiary italic">
                  Reviewed by board-certified medical oncologist.
                </p>
              </div>
            </AnimateOnScroll>
          </Container>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-mist py-16">
            <Container>
              <AnimateOnScroll>
                <h2 className="mb-8 text-2xl font-semibold text-ink">
                  Related research notes
                </h2>
              </AnimateOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <AnimateOnScroll key={related.slug} delay={0.1}>
                    <BlogCard article={related} />
                  </AnimateOnScroll>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
