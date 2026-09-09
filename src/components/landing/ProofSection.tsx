'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '@/components/ui/Container'

type View = 'recall' | 'trace'

function SourceRow({ color, label, meta }: { color: string; label: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${color}`} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{label}</p>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-white/45">{meta}</p>
      </div>
      <span className="font-mono text-[11px] text-cyan">linked</span>
    </div>
  )
}

export default function ProofSection() {
  const [view, setView] = useState<View>('trace')

  return (
    <section id="evidence" className="bg-paper py-24 sm:py-32">
      <Container>
        <div className="max-w-4xl">
          <div>
            <p className="eyebrow text-cyan-deep">Trace, don’t trust</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-ink sm:text-5xl lg:text-6xl">See the difference evidence makes.</h2>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[30px] border border-ink/10 bg-ink shadow-xl">
          <div className="grid lg:grid-cols-[0.62fr_1.38fr]">
            <div className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow text-white/45">Clinical query / AML</span>
                <span className="rounded-full bg-white/8 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-white/50">high stakes</span>
              </div>
              <p className="mt-6 text-xl font-medium leading-8 text-white sm:text-2xl">
                “What are the first-line options for a 78-year-old with newly diagnosed AML who is ineligible for intensive chemotherapy?”
              </p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.11em] text-white/40">Why this query is hard</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-white/60">
                  <li className="flex gap-3"><span className="text-cyan">01</span> Guideline decision logic is hierarchical.</li>
                  <li className="flex gap-3"><span className="text-cyan">02</span> A late-breaking FDA update changed the answer.</li>
                  <li className="flex gap-3"><span className="text-cyan">03</span> Completeness matters as much as correctness.</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#132a47] p-4 sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] p-1" role="group" aria-label="Compare answer modes">
                  <button
                    type="button"
                    aria-pressed={view === 'recall'}
                    onClick={() => setView('recall')}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${view === 'recall' ? 'bg-white text-ink' : 'text-white/50 hover:text-white'}`}
                  >
                    Model recall
                  </button>
                  <button
                    type="button"
                    aria-pressed={view === 'trace'}
                    onClick={() => setView('trace')}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${view === 'trace' ? 'bg-cyan text-ink' : 'text-white/50 hover:text-white'}`}
                  >
                    Aprilio trace
                  </button>
                </div>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/45">
                  <span className={`h-2 w-2 rounded-full ${view === 'trace' ? 'bg-success-light' : 'bg-coral'}`} />
                  {view === 'trace' ? 'provenance available' : 'source boundary unknown'}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {view === 'trace' ? (
                  <motion.div key="trace" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-7 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
                    <div className="rounded-2xl border border-cyan/25 bg-white/[0.055] p-5 sm:p-6">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-factum px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">Factum</span>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">current as retrieved</span>
                      </div>
                      <p className="mt-5 text-base font-medium leading-7 text-white sm:text-lg">
                        The full guideline-supported regimen set is retrieved and preserved. A newly approved cedazuridine + venetoclax regimen is isolated as potentially conflicting late-breaking information for clinician review.
                      </p>
                      <div className="mt-5 rounded-xl border border-factum/25 bg-factum/10 p-3">
                        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-factum">Potentially conflicting information</p>
                        <p className="mt-2 text-sm leading-5 text-white/70">FDA approval detected May 13, 2026, after the retrieved guideline revision.</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <SourceRow color="bg-cyan" label="ESMO guideline" meta="Exact page trace" />
                      <SourceRow color="bg-factum" label="FDA approval notice" meta="May 13, 2026" />
                      <SourceRow color="bg-violet-light" label="Ontology pathway" meta="AML → 1L → non-intensive" />
                      <div className="rounded-xl border border-success/20 bg-success/10 px-3 py-3">
                        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-success-light">Boundary preserved</p>
                        <p className="mt-1.5 text-sm leading-5 text-white/60">The system separates retrieved guidance from unreviewed external updates.</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="recall" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-7 rounded-2xl border border-coral/20 bg-coral/[0.06] p-5 sm:p-7">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-coral">
                      <span className="h-2 w-2 rounded-full bg-coral" /> Generated from model memory
                    </div>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                      A plausible summary is returned, but the current regimen set, the precise guideline location, and the late-breaking approval cannot be independently verified from the response.
                    </p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {['Citation provenance', 'Update awareness', 'Completeness boundary'].map((item) => (
                        <div key={item} className="rounded-xl border border-white/8 bg-black/10 p-3">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-white/35">Unknown</span>
                          <p className="mt-2 text-sm font-semibold text-white/60">{item}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="mt-4 text-right font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          Demonstration based on Aprilio’s internal 20-run AML reliability evaluation
        </p>
      </Container>
    </section>
  )
}
