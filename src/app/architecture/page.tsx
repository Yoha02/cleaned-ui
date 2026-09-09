import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Container from '@/components/ui/Container'
import KnowledgeGravity from '@/components/landing/KnowledgeGravity'
import HowItWorks from '@/components/landing/HowItWorks'

export const metadata: Metadata = {
  title: 'Architecture',
  description: 'Explore Aprilio Grounded Adaptive Retrieval, the Ontoharness, and the evidence-bounded Factum workflow.',
}

export default function ArchitecturePage() {
  return (
    <>
      <Navigation variant="research" />
      <main>
        <section className="hero-light relative overflow-hidden bg-paper pb-24 pt-32 sm:pb-28 sm:pt-40">
          <div className="hero-aurora absolute inset-0 opacity-70" aria-hidden="true" />
          <Container className="relative">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className="eyebrow text-cyan-deep">Research method</p>
                <h1 className="mt-6 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-ink sm:text-6xl lg:text-7xl">Build the map before asking for the answer.</h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-ink-muted">Grounded Adaptive Retrieval is our structure-first research method. It preserves source organization, resolves intent against that map, and returns a Factum only when the retrieved evidence can support it.</p>
                <div className="mt-8 inline-flex rounded-full border border-ink/10 bg-white px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-ink-muted">Provisional patent pending</div>
              </div>
              <div className="-mx-4 lg:-mr-14"><KnowledgeGravity /></div>
            </div>
          </Container>
        </section>
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
