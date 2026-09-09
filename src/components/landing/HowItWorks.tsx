'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { architectureStages } from '@/content/site'
import RetrievalComparison from './RetrievalComparison'

export default function HowItWorks() {
  return (
    <section id="engine" className="relative overflow-hidden bg-mist py-14 sm:py-16">
      <div className="absolute inset-0 soft-grid opacity-45" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-[.94fr_1.06fr] lg:items-end">
          <div>
            <p className="eyebrow text-cyan-deep">Architecture</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-ink lg:text-5xl">Two retrieval paths. One critical difference.</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-ink-muted lg:pb-2">Traditional RAG finds similar text. Aprilio’s Grounded Adaptive Retrieval follows structure, verifies recency, and preserves the evidence boundary.</p>
        </div>

        <RetrievalComparison />

        <div className="mt-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-violet">Inside GAR</p>
            <h3 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl">Map once. Retrieve with structure. Adapt as sources change.</h3>
          </div>
          <p className="max-w-lg text-base leading-7 text-ink-muted">Aprilio turns an unfamiliar knowledge base into a reusable retrieval system rather than a pile of disconnected chunks.</p>
        </div>

        <div className="relative mt-10">
          <div className="absolute left-[9%] right-[9%] top-[58px] hidden h-px bg-ink/15 lg:block" aria-hidden="true">
            <motion.span className="block h-px origin-left bg-gradient-to-r from-cyan-deep via-violet to-factum" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {architectureStages.map((stage, index) => (
              <motion.article key={stage.number} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, delay: index * 0.12 }} className="group relative rounded-[26px] border border-ink/10 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl font-mono text-sm font-bold ${index === 0 ? 'bg-cyan text-ink' : index === 1 ? 'bg-violet text-white' : 'bg-factum text-ink'}`}>{stage.number}</span>
                  <span className="eyebrow text-ink-faint">{stage.eyebrow}</span>
                </div>
                <div className="mt-9">
                  <p className="font-mono text-[15px] font-bold uppercase tracking-[0.08em] text-cyan-deep">{stage.agent}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-ink">{stage.title}</h3>
                  <p className="mt-4 text-base leading-7 text-ink-muted">{stage.description}</p>
                </div>
                <div className="mt-7 flex items-center justify-between rounded-xl bg-mist px-3 py-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">Output</span>
                  <span className="text-[15px] font-semibold text-ink">{stage.output}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-[24px] border border-ink/10 bg-white/80 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink font-mono text-sm font-bold text-cyan">↻</span>
            <div>
              <p className="text-base font-semibold text-ink">Closed-loop regeneration</p>
              <p className="mt-1 text-sm leading-6 text-ink-muted">When a source changes or a layer fails, Aprilio rebuilds the affected part of the harness.</p>
            </div>
          </div>
          <Link href="/#evaluations" className="text-sm font-semibold text-ink transition-colors hover:text-cyan-deep">Explore the evaluations <span aria-hidden="true">↗</span></Link>
        </div>
      </Container>
    </section>
  )
}
