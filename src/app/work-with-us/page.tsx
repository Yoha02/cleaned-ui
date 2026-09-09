import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Research Collaboration',
  description: 'Collaborate with Aprilio on governed knowledge sources, clinical evaluation, and external validation.',
}

const opportunities = [
  { id: 'sources', number: '01', eyebrow: 'Knowledge sources', title: 'Study a governed source.', description: 'Work with us to test structure-aware retrieval on a trusted medical knowledge base under clearly defined access, attribution, and publication terms.', bullets: ['Source-specific mapping', 'Defined data governance', 'Traceable research outputs'], interest: 'knowledge-source' },
  { id: 'evaluation', number: '02', eyebrow: 'Clinical evaluation', title: 'Co-design a meaningful protocol.', description: 'Define representative questions, important failure modes, and review criteria with clinicians and domain researchers.', bullets: ['Clinically relevant scenarios', 'Transparent comparison criteria', 'Expert review'], interest: 'research' },
  { id: 'validation', number: '03', eyebrow: 'External validation', title: 'Test the method in a new setting.', description: 'Help evaluate whether the approach transfers across specialties, institutions, and changing source environments.', bullets: ['New clinical domains', 'Independent replication', 'Documented limitations'], interest: 'validation' },
]

export default function WorkWithUsPage() {
  return (
    <>
      <Navigation variant="research" />
      <main>
        <section className="hero-light relative overflow-hidden bg-paper pb-24 pt-36 sm:pb-32 sm:pt-44">
          <div className="hero-aurora absolute inset-0 opacity-60" aria-hidden="true" />
          <Container className="relative">
            <p className="eyebrow text-cyan-deep">Research collaboration</p>
            <h1 className="mt-7 max-w-5xl text-[clamp(4rem,9vw,8.5rem)] font-semibold leading-[0.87] tracking-[-0.075em] text-ink">Study grounded retrieval where the knowledge is real.</h1>
            <div className="mt-10 grid gap-6 border-t border-ink/12 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-2xl text-xl leading-9 text-ink-muted">We are inviting clinical, academic, and knowledge-source partners to help define, test, and independently evaluate the method.</p>
              <span className="w-fit rounded-full border border-cyan-deep/20 bg-cyan/10 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-cyan-deep">External validation invited</span>
            </div>
          </Container>
        </section>

        <section className="bg-bg py-20 sm:py-28">
          <Container>
            <div className="space-y-5">
              {opportunities.map((item) => (
                <article id={item.id} key={item.id} className="scroll-mt-28 rounded-[30px] border border-ink/10 bg-white p-6 shadow-sm sm:p-9 lg:grid lg:grid-cols-[.75fr_1.25fr_.8fr] lg:gap-10 lg:p-11">
                  <div><span className="font-mono text-[11px] font-bold text-cyan-deep">{item.number}</span><p className="mt-8 eyebrow text-cyan-deep">{item.eyebrow}</p><h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-ink sm:text-4xl">{item.title}</h2></div>
                  <p className="mt-7 text-lg leading-8 text-ink-muted lg:mt-14">{item.description}</p>
                  <div className="mt-7 lg:mt-14"><ul className="space-y-3">{item.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-sm leading-6 text-ink-muted"><span className="text-cyan-deep">↗</span>{bullet}</li>)}</ul><Link href={`/contact?interest=${item.interest}`} className="mt-6 inline-flex text-sm font-semibold text-ink hover:text-cyan-deep">Discuss the research →</Link></div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
