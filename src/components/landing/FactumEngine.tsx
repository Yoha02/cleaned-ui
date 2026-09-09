'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const steps = [
  { number: '01', label: 'Map sources' },
  { number: '02', label: 'Retrieve evidence' },
  { number: '03', label: 'Reconcile updates' },
  { number: '04', label: 'Issue Factum' },
]

const processors = [
  { short: 'C', name: 'Cartographer', detail: 'Mapped 14 sections to the AML pathway', color: 'bg-cyan text-ink' },
  { short: 'S', name: 'Semantic annotator', detail: 'Resolved intent: 1L · older adult · non-intensive', color: 'bg-violet text-white' },
  { short: 'A', name: 'Architect', detail: 'Separated guideline consensus from new evidence', color: 'bg-ink text-white' },
]

const timing = [650, 1650, 2850, 4100]

export default function FactumEngine() {
  const [phase, setPhase] = useState(0)
  const [run, setRun] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    setPhase(0)
    setRunning(true)
    const timers = timing.map((delay, index) => window.setTimeout(() => setPhase(index + 1), delay))
    timers.push(window.setTimeout(() => setRunning(false), 4750))
    return () => timers.forEach(window.clearTimeout)
  }, [run])

  const replay = () => setRun((value) => value + 1)
  const currentStep = running ? steps[Math.max(phase - 1, 0)].label : 'Verified Factum issued'

  return (
    <div className="relative mx-auto w-full max-w-[1240px]" aria-label="Live Factum Trace showing a clinical question transformed into a verified answer">
      <div className="absolute -inset-12 rounded-[56px] bg-gradient-to-r from-cyan/15 via-factum/10 to-violet/15 blur-3xl" aria-hidden="true" />

      <div className="glass-panel relative overflow-hidden rounded-[30px] border-white/70 bg-white/80 p-2 shadow-[0_40px_120px_rgba(16,37,66,.16)] sm:rounded-[38px] sm:p-4">
        <div className="flex min-h-12 items-center justify-between gap-3 border-b border-ink/10 px-3 pb-3 pt-1 sm:px-4">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-coral" />
            <span className="h-2.5 w-2.5 rounded-full bg-factum" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-deep" />
          </div>
          <span className="eyebrow hidden text-ink-faint sm:block">Aprilio / Live Factum Trace 01</span>
          <div className="flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-success sm:text-xs">
            <span className={`h-1.5 w-1.5 rounded-full bg-success ${running ? 'trace-status-pulse' : ''}`} />
            {running ? 'processing' : 'verified'}
          </div>
        </div>

        <div className="p-2 sm:p-4 lg:p-5">
          <div className="rounded-[22px] border border-ink/10 bg-ink px-4 py-4 text-white shadow-xl sm:flex sm:items-center sm:gap-5 sm:px-6 sm:py-5">
            <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.11em] text-cyan sm:w-[142px] sm:text-xs">
              <span className="grid h-6 w-6 place-items-center rounded-lg border border-cyan/30 bg-cyan/10 text-xs">?</span>
              Clinical query
            </div>
            <p className="mt-3 flex-1 text-[15px] font-medium leading-6 sm:mt-0 sm:text-lg">What changed in first-line AML treatment for older adults?</p>
            <button
              type="button"
              onClick={replay}
              disabled={running}
              data-testid="run-factum-trace"
              className="mt-4 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-factum px-5 font-mono text-xs font-bold uppercase tracking-[0.07em] text-ink transition hover:-translate-y-0.5 hover:bg-[#ffd978] disabled:cursor-wait disabled:opacity-65 sm:mt-0"
            >
              {running ? 'Tracing' : 'Replay trace'} <span aria-hidden="true">{running ? '•••' : '↻'}</span>
            </button>
          </div>

          <div className="relative mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-ink/8 bg-paper/70 p-2 sm:grid-cols-4 sm:gap-0 sm:p-3">
            <span className="absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-px bg-ink/10 sm:block" aria-hidden="true" />
            <motion.span className="absolute left-[12.5%] top-[27px] hidden h-px origin-left bg-cyan-deep sm:block" animate={{ width: `${Math.max(0, phase - 1) * 25}%` }} transition={{ duration: 0.55, ease: 'easeOut' }} aria-hidden="true" />
            {steps.map((step, index) => {
              const active = phase === index + 1 && running
              const complete = phase > index + 1 || (!running && phase === 4)
              return (
                <div key={step.number} className={`relative z-10 flex items-center gap-2 rounded-xl px-2 py-2 transition-colors sm:justify-center ${active ? 'bg-white shadow-sm' : ''}`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-[11px] font-bold transition-all duration-500 ${complete ? 'border-cyan-deep bg-cyan-deep text-white' : active ? 'border-factum bg-factum text-ink shadow-[0_0_0_5px_rgba(246,200,95,.18)]' : 'border-ink/15 bg-white text-ink-faint'}`}>{complete ? '✓' : step.number}</span>
                  <span className={`font-mono text-[11px] font-bold uppercase tracking-[0.05em] ${active || complete ? 'text-ink' : 'text-ink-faint'}`}>{step.label}</span>
                </div>
              )
            })}
          </div>

          <div className="trace-stage soft-grid relative mt-4 grid overflow-hidden rounded-[24px] border border-ink/10 bg-white/60 lg:grid-cols-[.8fr_1fr_1.3fr]">
            <section className="border-b border-ink/10 p-4 sm:p-5 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-ink-faint">01 / Source field</p>
                <span className="font-mono text-[11px] uppercase text-ink-faint">2 live inputs</span>
              </div>
              <div className="mt-4 space-y-3">
                <SourceCard active={phase >= 1} tag="GUIDELINE" title="ESMO · Acute Myeloid Leukemia" meta="v3.2026 · 214 pages" accent="cyan" note="14 relevant sections mapped" />
                <SourceCard active={phase >= 2} tag="LIVE UPDATE" title="FDA approval notice" meta="13 May 2026 · newer than source" accent="factum" note="Recency conflict detected" />
              </div>
              <div className={`mt-4 rounded-2xl border border-dashed p-3 transition-all duration-500 ${phase >= 1 ? 'border-violet/35 bg-violet/5 opacity-100' : 'border-ink/10 opacity-45'}`}>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-violet">Resolved intent</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {['AML', '1st line', 'older adult', 'non-intensive'].map((item) => <span key={item} className="rounded-full border border-violet/15 bg-white px-2.5 py-1.5 font-mono text-[11px] text-ink-muted">{item}</span>)}
                </div>
              </div>
            </section>

            <section className="relative border-b border-ink/10 p-4 sm:p-5 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow text-ink-faint">02–03 / Ontoharness</p>
                <p aria-live="polite" className="text-right font-mono text-[11px] uppercase tracking-[0.05em] text-cyan-deep">{currentStep}</p>
              </div>
              <div className="relative mt-4 space-y-3">
                <span className="absolute bottom-6 left-5 top-6 w-px bg-ink/10" aria-hidden="true" />
                <motion.span className="absolute left-5 top-6 w-px origin-top bg-gradient-to-b from-cyan-deep via-violet to-ink" animate={{ height: phase >= 3 ? 'calc(100% - 48px)' : phase === 2 ? '50%' : phase === 1 ? '10%' : '0%' }} transition={{ duration: 0.7, ease: 'easeOut' }} aria-hidden="true" />
                {processors.map((processor, index) => {
                  const processorPhase = index + 1
                  const active = phase === processorPhase && running
                  const complete = phase > processorPhase || (!running && phase === 4)
                  return (
                    <motion.div key={processor.name} animate={{ opacity: phase >= processorPhase ? 1 : 0.48, x: active ? 5 : 0 }} transition={{ duration: 0.4 }} className={`relative flex min-h-[94px] items-center gap-3.5 rounded-2xl border bg-white p-4 transition-shadow ${active ? 'border-factum/70 shadow-[0_12px_28px_rgba(16,37,66,.10)]' : complete ? 'border-cyan-deep/20' : 'border-ink/8'}`}>
                      <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold shadow-sm ${processor.color}`}>{complete ? '✓' : processor.short}</span>
                      <div><p className="text-base font-bold text-ink sm:text-[17px]">{processor.name}</p><p className="mt-1 text-[13px] leading-5 text-ink-muted sm:text-sm">{processor.detail}</p></div>
                      {active && <span className="trace-packet absolute right-3 top-3 h-2 w-2 rounded-full bg-factum" aria-hidden="true" />}
                    </motion.div>
                  )
                })}
              </div>
            </section>

            <section className="relative flex min-h-[410px] flex-col p-4 sm:p-5 lg:min-h-0">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-ink-faint">04 / Bounded answer</p>
                <span className={`rounded-full px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${phase >= 4 ? 'bg-success/10 text-success' : 'bg-ink/5 text-ink-faint'}`}>{phase >= 4 ? 'Verified' : 'Assembling'}</span>
              </div>
              <div className="relative mt-4 flex flex-1">
                <AnimatePresence mode="wait">
                  {phase < 4 ? (
                    <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} className="flex w-full flex-col justify-center rounded-[22px] border border-dashed border-ink/15 bg-paper/70 p-5">
                      <div className="trace-orbit mx-auto grid h-20 w-20 place-items-center rounded-full border border-ink/10 bg-white shadow-sm"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink font-mono text-sm font-bold text-factum">F</span></div>
                      <p className="mt-5 text-center text-sm font-semibold text-ink">Building a Factum</p>
                      <p className="mx-auto mt-2 max-w-[280px] text-center text-sm leading-6 text-ink-muted">Claims appear only after structure, recency, and provenance checks complete.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="factum" initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 20 }} className="factum-shimmer w-full overflow-hidden rounded-[22px] border border-factum/55 bg-ink p-5 text-white shadow-[0_22px_55px_rgba(16,37,66,.25)]">
                      <div className="flex items-center justify-between gap-3"><span className="eyebrow text-factum">Factum 04</span><span className="rounded-full bg-success/20 px-2.5 py-1.5 font-mono text-[11px] font-bold text-success-light">VERIFIED</span></div>
                      <p className="mt-4 text-[17px] font-semibold leading-7 sm:text-[19px]">For older adults ineligible for intensive induction, the guideline-backed regimen set remains intact.</p>
                      <p className="mt-3 text-sm leading-6 text-white/75 sm:text-[15px]">A newer FDA approval is isolated as a late-breaking update for clinician review, not silently merged into guideline consensus.</p>
                      <div className="mt-4 rounded-xl border border-factum/20 bg-factum/10 p-3.5"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-factum">Uncertainty boundary preserved</p><p className="mt-1.5 text-[13px] leading-5 text-white/70">No claim extends beyond retrieved evidence.</p></div>
                      <div className="mt-4 flex flex-wrap gap-2"><CitationDot color="bg-cyan" label="ESMO · exact pages" /><CitationDot color="bg-factum" label="FDA · 13 May 2026" /></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>

          <div className="mt-3 grid grid-cols-3 divide-x divide-ink/10 rounded-2xl border border-ink/8 bg-white/70 py-3 text-center">
            <TraceMetric value={phase >= 1 ? '214' : '--'} label="pages mapped" />
            <TraceMetric value={phase >= 3 ? '02' : '--'} label="sources reconciled" />
            <TraceMetric value={phase >= 4 ? '00' : '--'} label="unsupported claims" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SourceCard({ active, tag, title, meta, accent, note }: { active: boolean; tag: string; title: string; meta: string; accent: 'cyan' | 'factum'; note: string }) {
  const accentClasses = accent === 'cyan' ? 'bg-cyan/15 text-cyan-deep' : 'bg-factum/20 text-[#9a6910]'
  return (
    <motion.div animate={{ opacity: active ? 1 : 0.45, y: active ? 0 : 3 }} transition={{ duration: 0.45 }} className={`rounded-2xl border bg-white p-4 transition-shadow ${active ? 'border-ink/12 shadow-[0_10px_25px_rgba(16,37,66,.08)]' : 'border-ink/8'}`}>
      <div className="flex items-start gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-[11px] font-bold ${accentClasses}`}>{tag.slice(0, 3)}</span><div className="min-w-0"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-ink-faint">{tag}</p><p className="mt-1 text-sm font-bold leading-5 text-ink sm:text-[15px]">{title}</p><p className="mt-1 font-mono text-xs leading-4 text-ink-faint">{meta}</p></div></div>
      <div className={`mt-3 flex items-center gap-2 border-t border-ink/8 pt-2.5 font-mono text-xs leading-4 ${active ? 'text-success' : 'text-ink-faint'}`}><span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-success' : 'bg-ink/20'}`} /> {active ? note : 'Waiting for trace'}</div>
    </motion.div>
  )
}

function CitationDot({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[11px] text-white/75"><span className={`h-1.5 w-1.5 rounded-full ${color}`} /> {label}</span>
}

function TraceMetric({ value, label }: { value: string; label: string }) {
  return <div className="px-2"><p className="font-mono text-[17px] font-bold text-ink">{value}</p><p className="mt-1 font-mono text-[11px] uppercase tracking-[0.05em] text-ink-faint">{label}</p></div>
}
