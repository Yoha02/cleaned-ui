'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

const reasons = [
  { number: '01', title: 'Current', description: 'Checks changing sources before an answer is issued.', color: 'bg-cyan', icon: '↻' },
  { number: '02', title: 'Traceable', description: 'Connects each claim to the exact source and retrieval path.', color: 'bg-factum', icon: '↗' },
  { number: '03', title: 'Structured', description: 'Preserves hierarchies and decision logic instead of flattening them.', color: 'bg-violet-light', icon: '⌘' },
  { number: '04', title: 'Bounded', description: 'Stops when required evidence is missing rather than filling the gap.', color: 'bg-success-light', icon: '⊘' },
]

const stages = [
  { number: '01', label: 'Map', detail: 'Preserve source structure' },
  { number: '02', label: 'Reconcile', detail: 'Check intent and recency' },
  { number: '03', label: 'Bound', detail: 'Link claims or stop' },
]

export default function WhyAprilio() {
  return (
    <section id="why-aprilio" className="bg-paper py-20 sm:py-28" aria-labelledby="why-aprilio-title">
      <Container>
        <div className="rounded-[36px] border border-ink/8 bg-mist/70 p-5 shadow-[0_24px_80px_rgba(16,37,66,.08)] sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[.86fr_1.14fr] lg:items-center">
            <div>
              <p className="eyebrow text-cyan-deep">Why Aprilio</p>
              <h2 id="why-aprilio-title" className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-ink sm:text-5xl lg:text-6xl">
                Intelligence you can inspect.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">
                Aprilio follows the organization of a knowledge base, checks what changed, and preserves the boundary of what the sources can support.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/architecture" className="button-link button-link-dark">
                  Explore the architecture <span aria-hidden="true">↗</span>
                </Link>
                <span className="inline-flex items-center rounded-full border border-ink/10 bg-white px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-ink-muted">
                  Provisional patent pending
                </span>
              </div>
            </div>

            <div className="rounded-[30px] border border-ink/10 bg-white p-4 shadow-[0_22px_60px_rgba(16,37,66,.09)] sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.11em] text-cyan-deep">Grounded Adaptive Retrieval</p>
                <span className="hidden rounded-full bg-cyan/15 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-cyan-deep sm:inline-flex">
                  Structure before generation
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {stages.map((stage, index) => (
                  <motion.article
                    key={stage.number}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative rounded-[22px] border border-ink/10 bg-paper p-5"
                  >
                    {index < stages.length - 1 && <span className="absolute -right-4 top-1/2 z-10 hidden h-px w-5 bg-cyan-deep/40 sm:block" aria-hidden="true" />}
                    <span className="font-mono text-[12px] font-bold text-cyan-deep">{stage.number}</span>
                    <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em] text-ink">{stage.label}</h3>
                    <p className="mt-2 text-base leading-7 text-ink-muted">{stage.detail}</p>
                  </motion.article>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-ink px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-cyan">Verified Factum</span>
                <span className="text-base font-semibold">Current · linked · bounded</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group rounded-[24px] border border-ink/10 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${reason.color} font-mono text-lg font-bold text-ink`}>{reason.icon}</span>
                  <span className="font-mono text-xs font-bold tracking-[0.09em] text-ink-faint">{reason.number}</span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold tracking-[-0.04em] text-ink">{reason.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink-muted">{reason.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
