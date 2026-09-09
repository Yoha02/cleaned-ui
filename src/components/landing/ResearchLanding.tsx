'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { AprilioWordmark } from '@/components/BrandLogo'
import Container from '@/components/ui/Container'
import FactumEngine from '@/components/landing/FactumEngine'
import { clinicalEvaluations, type ClinicalEvaluation } from '@/content/clinicalEvaluations'

const researchQuestions = [
  {
    number: '01',
    title: 'How can AI preserve the structure of a medical source?',
    copy: 'We study retrieval systems that navigate sections, pathways, and relationships instead of flattening knowledge into statistically similar fragments.',
    signal: 'Source structure',
  },
  {
    number: '02',
    title: 'How should a system respond when the evidence changes?',
    copy: 'We examine how clinical guidance, new approvals, and emerging evidence can be reconciled without silently rewriting established consensus.',
    signal: 'Change detection',
  },
  {
    number: '03',
    title: 'Can an answer expose the boundary of what is known?',
    copy: 'We design outputs that remain tied to their evidence and stop when the available sources cannot support a claim.',
    signal: 'Evidence bounds',
  },
]

const researchSteps = [
  { number: '01', title: 'Map', copy: 'Represent the source hierarchy, entities, and decision logic.' },
  { number: '02', title: 'Reconcile', copy: 'Resolve clinical intent and check the source set for change.' },
  { number: '03', title: 'Bound', copy: 'Return source-linked claims or expose where evidence ends.' },
]

const collaborationModes = [
  {
    tag: 'Knowledge sources',
    title: 'Study a governed source',
    copy: 'Evaluate how structure-aware retrieval behaves across a trusted medical knowledge base.',
  },
  {
    tag: 'Clinical research',
    title: 'Co-design an evaluation',
    copy: 'Define clinically meaningful questions, failure modes, and review criteria with domain experts.',
  },
  {
    tag: 'New domains',
    title: 'Validate another specialty',
    copy: 'Test whether the approach transfers beyond our initial work in oncology.',
  },
  {
    tag: 'Knowledge change',
    title: 'Study what changed',
    copy: 'Measure how the system responds when guidance, evidence, or source organization evolves.',
  },
]

const evaluationNotes = [
  {
    type: 'Research note',
    date: 'May 6, 2026',
    title: 'The Neurosymbolic Advantage: Why Structured Data Beats Bigger Models',
    copy: 'A research perspective on combining explicit structure with learned systems for high-stakes knowledge.',
    href: '/blog/neurosymbolic-advantage',
  },
  {
    type: 'Failure study',
    date: 'May 2, 2026',
    title: 'What Happens When AI Recommends an FDA-Rejected Drug?',
    copy: 'A close look at recency, provenance, and the consequences of answers detached from changing evidence.',
    href: '/blog/what-happens-when-ai-recommends-fda-rejected-drug',
  },
  {
    type: 'Methods essay',
    date: 'April 28, 2026',
    title: 'Why We Built Grounded Adaptive Retrieval',
    copy: 'The clinical and systems questions that led to Aprilio’s structure-first retrieval method.',
    href: '/blog/why-we-built-grounded-retrieval',
  },
]

function ResearchField() {
  const sourceCards = [
    { label: 'Guideline', detail: 'source structure', accent: 'text-cyan-deep', dot: 'bg-cyan' },
    { label: 'Live update', detail: 'new evidence', accent: 'text-[#b77912]', dot: 'bg-factum' },
    { label: 'Clinical study', detail: 'emerging signal', accent: 'text-violet', dot: 'bg-violet' },
  ]

  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div className="absolute inset-10 rounded-full bg-gradient-to-br from-cyan/25 via-violet/10 to-factum/20 blur-3xl" aria-hidden="true" />
      <div className="glass-panel soft-grid relative min-h-[460px] overflow-hidden rounded-[30px] border-white/80 bg-white/72 p-5 sm:min-h-[490px] sm:p-6">
        <div className="relative z-10 flex items-center justify-between border-b border-ink/10 pb-3">
          <span className="eyebrow text-ink-faint">Aprilio research system</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Working prototype
          </span>
        </div>

        <div className="relative mt-4 grid min-h-[370px] grid-cols-[minmax(0,1fr)_minmax(155px,0.9fr)] items-center gap-4 sm:grid-cols-[1fr_1.05fr]">
          <div className="relative z-20 flex flex-col gap-2.5">
            {sourceCards.map((source, index) => (
              <motion.div
                key={source.label}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + index * 0.16, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-ink/10 bg-paper/95 p-3 shadow-[0_12px_30px_rgba(16,37,66,0.07)] sm:p-3.5"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${source.dot}`} />
                  <div>
                    <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${source.accent}`}>{source.label}</p>
                    <p className="mt-1 text-sm font-semibold text-ink sm:text-base">{source.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 540 410" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="research-route" x1="90" y1="70" x2="480" y2="335" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5fe1e6" />
                <stop offset="0.52" stopColor="#7768d8" />
                <stop offset="1" stopColor="#f6c85f" />
              </linearGradient>
            </defs>
            <path d="M160 78 C250 78 240 190 348 190" stroke="url(#research-route)" strokeWidth="1.5" strokeDasharray="5 7" opacity=".44" />
            <path d="M160 191 C242 191 248 191 348 191" stroke="url(#research-route)" strokeWidth="1.5" strokeDasharray="5 7" opacity=".44" />
            <path d="M160 302 C250 302 240 192 348 192" stroke="url(#research-route)" strokeWidth="1.5" strokeDasharray="5 7" opacity=".44" />
            <path d="M415 244 L415 322" stroke="url(#research-route)" strokeWidth="1.5" strokeDasharray="5 7" opacity=".52" />
            {[0, 1, 2].map((index) => (
              <motion.circle
                key={index}
                r="5"
                fill={index === 0 ? '#5fe1e6' : index === 1 ? '#7768d8' : '#f6c85f'}
                animate={{ cx: [162, 255, 350], cy: [78 + index * 112, 154 + index * 37, 191] }}
                transition={{ duration: 3.8, delay: index * 0.55, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
              />
            ))}
            <motion.circle r="5" fill="#f6c85f" animate={{ cx: [415, 415], cy: [244, 320] }} transition={{ duration: 1.2, delay: 2.4, repeat: Infinity, repeatDelay: 3.8, ease: 'easeInOut' }} />
          </svg>

          <div className="relative z-20 flex flex-col items-center gap-4">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative grid h-36 w-36 place-items-center rounded-full border border-cyan-deep/20 bg-gradient-to-br from-[#e9fbfb] to-[#f2efff] shadow-[0_24px_65px_rgba(16,37,66,.14)] sm:h-40 sm:w-40"
            >
              <span className="absolute inset-4 rounded-full border border-cyan-deep/15" />
              <span className="absolute inset-8 rounded-full border border-violet/15" />
              <div className="relative text-center">
                <span className="eyebrow text-cyan-deep">Ontology</span>
                <p className="mt-2 text-lg font-semibold leading-tight text-ink">Source map</p>
                <p className="mt-1 text-xs text-ink-muted">structure + meaning</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="w-full rounded-2xl bg-ink p-3.5 text-white shadow-[0_18px_45px_rgba(16,37,66,.2)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-factum">Factum</span>
                <span className="rounded-full bg-success/20 px-2 py-1 font-mono text-[9px] font-bold uppercase text-[#87e6ca]">bounded</span>
              </div>
              <p className="mt-2 text-sm font-semibold sm:text-base">Current · linked · supported</p>
            </motion.div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint sm:text-[10px]">Animated research workflow · not a clinical decision tool</p>
    </div>
  )
}

function ResearchHero() {
  return (
    <section className="hero-light relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-8 lg:pt-24">
      <div className="hero-aurora absolute inset-0" aria-hidden="true" />
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-[0.025]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-16 top-36 font-heading text-[13rem] font-bold leading-none tracking-[-0.08em] text-ink/[0.018] lg:text-[20rem]" aria-hidden="true">RESEARCH</div>
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 xl:grid-cols-[1.16fr_0.84fr] xl:gap-12">
          <div className="max-w-[700px]">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-cyan-deep/15 bg-cyan/10 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-deep shadow-[0_0_0_5px_rgba(21,156,165,.09)]" />
              <span className="eyebrow text-cyan-deep">Grounded knowledge research</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.72, ease: [0.16, 1, 0.3, 1] }} className="mt-5 max-w-[700px] text-[clamp(3.1rem,4.7vw,5.25rem)] font-medium leading-[0.9] tracking-[-0.06em] text-ink">
              <span className="xl:block xl:whitespace-nowrap">Keeping complex</span>{' '}
              <span className="xl:block">knowledge</span>{' '}
              <span className="hero-gradient-text">current, traceable, and bounded.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23, duration: 0.7 }} className="mt-5 max-w-[620px] text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Aprilio is a multidisciplinary research effort developing structure-based retrieval for knowledge that changes faster than conventional AI systems can reliably follow.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.36, duration: 0.7 }} className="mt-6 flex flex-wrap gap-3">
              <Link href="#collaborate" className="button-link button-link-dark">Collaborate on research <span aria-hidden="true">↗</span></Link>
              <Link href="#research-method" className="button-link button-link-light">Explore the method <span aria-hidden="true">↓</span></Link>
            </motion.div>
            <div className="mt-6 grid max-w-[620px] grid-cols-1 gap-2 border-t border-ink/10 pt-4 sm:grid-cols-3">
              {['Working prototype', 'Internal evaluation', 'External validation invited'].map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 + index * 0.1 }} className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-ink-faint">
                  <span className={`h-1.5 w-1.5 rounded-full ${index === 2 ? 'bg-factum' : 'bg-cyan-deep'}`} /> {item}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:-mt-2 lg:translate-x-3 xl:w-[600px] xl:translate-x-8">
            <ResearchField />
          </div>
        </div>
      </Container>
    </section>
  )
}

function ResearchAgenda() {
  return (
    <section id="research-agenda" className="bg-paper py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow text-cyan-deep">Research agenda</p>
            <h2 className="mt-5 text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-ink sm:text-6xl">Three questions guide the work.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink-muted lg:justify-self-end sm:text-xl sm:leading-9">Our work asks how AI can navigate changing medical knowledge without losing source structure, recency, or the boundary of available evidence.</p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {researchQuestions.map((question, index) => (
            <motion.article key={question.number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.1, duration: 0.6 }} className="group flex min-h-[390px] flex-col rounded-[28px] border border-ink/10 bg-white p-7 shadow-[0_18px_55px_rgba(16,37,66,.06)] transition-transform duration-300 hover:-translate-y-1 sm:p-8">
              <div className="flex items-center justify-between">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl font-mono text-sm font-bold ${index === 0 ? 'bg-cyan/70' : index === 1 ? 'bg-violet text-white' : 'bg-factum'}`}>{question.number}</span>
                <span className="eyebrow text-ink-faint">Open question</span>
              </div>
              <h3 className="mt-10 text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink">{question.title}</h3>
              <p className="mt-5 text-base leading-7 text-ink-muted">{question.copy}</p>
              <div className="mt-auto border-t border-ink/10 pt-6 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-deep">{question.signal}</div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ResearchMethod() {
  return (
    <section id="research-method" className="soft-grid relative overflow-hidden bg-mist py-24 sm:py-32">
      <div className="absolute right-[-12rem] top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-cyan/15 blur-3xl" aria-hidden="true" />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-cyan-deep">Research prototype</p>
          <h2 className="mt-5 text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-ink sm:text-7xl">Structure before generation.</h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-ink-muted sm:text-xl sm:leading-9">Grounded Adaptive Retrieval builds a source-specific map, resolves a question against that structure, and produces a Factum only when the retrieved evidence can support it.</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-3 md:grid-cols-3">
          {researchSteps.map((step, index) => (
            <div key={step.number} className="relative rounded-2xl border border-ink/10 bg-paper/90 p-6">
              <div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-cyan-deep">{step.number}</span><span className="h-2 w-2 rounded-full bg-factum" /></div>
              <h3 className="mt-7 text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{step.copy}</p>
              {index < 2 && <span className="absolute -right-2 top-1/2 z-10 hidden h-px w-4 bg-cyan-deep/35 md:block" aria-hidden="true" />}
            </div>
          ))}
        </div>
        <div className="mt-14"><FactumEngine /></div>
        <div className="mt-8 text-center"><Link href="/architecture" className="inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-cyan-deep/35 underline-offset-8 transition hover:decoration-cyan-deep">Inspect the full architecture <span aria-hidden="true">↗</span></Link></div>
      </Container>
    </section>
  )
}

function FullOutputModal({ evaluation, onClose }: { evaluation: ClinicalEvaluation; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/72 p-3 backdrop-blur-md sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="full-output-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/20 bg-paper shadow-[0_30px_100px_rgba(4,18,36,.36)]"
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex shrink-0 items-start justify-between gap-5 border-b border-ink/10 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-deep">
              Aprilio research prototype · Full captured output
            </p>
            <h3 id="full-output-title" className="mt-2 max-w-4xl text-lg font-semibold leading-6 text-ink sm:text-xl">
              {evaluation.question}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/10 bg-mist text-xl text-ink transition hover:border-cyan-deep/30 hover:bg-cyan/10"
            aria-label="Close full output"
          >
            ×
          </button>
        </div>
        <div className="overflow-auto bg-[#f7f8fa]">
          <Image
            src={evaluation.fullOutput.src}
            width={evaluation.fullOutput.width}
            height={evaluation.fullOutput.height}
            alt={evaluation.fullOutput.alt}
            className="h-auto w-full min-w-[820px] sm:min-w-0"
            sizes="(max-width: 768px) 100vw, 1152px"
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

function ResearchEvaluation() {
  const [active, setActive] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)
  const [fullOutput, setFullOutput] = useState<ClinicalEvaluation | null>(null)
  const evaluation = clinicalEvaluations[active]

  useEffect(() => {
    if (fullOutput) return
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % clinicalEvaluations.length)
      setCycleKey((current) => current + 1)
    }, 9000)
    return () => window.clearInterval(timer)
  }, [active, fullOutput])

  const selectEvaluation = (index: number) => {
    setActive(index)
    setCycleKey((current) => current + 1)
  }

  return (
    <>
    <section id="evaluations" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-48 top-20 h-[34rem] w-[34rem] rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-cyan-deep">Evaluation</p>
            <h2 className="mt-5 text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-ink sm:text-6xl">Three questions. One changing evidence problem.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink-muted lg:justify-self-end">We compared five frontier models with Aprilio&apos;s research prototype across three oncology questions where recency, context, and evidence boundaries materially change the answer.</p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[34px] border border-ink/10 bg-white shadow-[0_28px_80px_rgba(16,37,66,.09)]">
          <div className="border-b border-ink/10 px-5 py-5 sm:px-8">
            <div className="flex flex-nowrap items-center justify-center gap-1 sm:gap-5">
              {clinicalEvaluations.map((item, index) => (
                <button key={item.id} type="button" onClick={() => selectEvaluation(index)} className={`flex items-center gap-1.5 rounded-full border px-3 py-2.5 text-xs font-semibold transition sm:gap-2 sm:px-5 sm:text-sm ${index === active ? 'border-cyan-deep/30 bg-cyan/15 text-cyan-deep shadow-[0_8px_24px_rgba(54,156,170,.1)]' : 'border-transparent text-ink-muted hover:border-cyan-deep/20 hover:text-ink'}`}>
                  <span className={`grid h-7 w-7 place-items-center rounded-full font-mono text-[11px] font-bold ${index === active ? 'bg-cyan text-ink' : 'bg-mist text-ink-faint'}`}>{item.id}</span>
                  <span className="sm:hidden">Q{item.id}</span>
                  <span className="hidden sm:inline">Question {item.id}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="h-0.5 bg-mist">
            <motion.div key={cycleKey} className="h-full bg-gradient-to-r from-cyan-deep via-violet to-factum" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 9, ease: 'linear' }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={evaluation.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="p-5 sm:p-8">
              <div className="mb-4 text-center">
                <span className="inline-flex rounded-full bg-mist px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-deep">{evaluation.shortLabel} evaluation</span>
              </div>
              <p className="mx-auto max-w-5xl text-center text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-3xl">“{evaluation.question}”</p>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div className="overflow-hidden rounded-[24px] border border-[#f3977d]/30 bg-[#fff8f4]">
                  <div className="flex items-center gap-2 border-b border-[#f3977d]/20 px-5 py-4 text-[#c75d4d]"><span aria-hidden="true">△</span><span className="font-semibold">What foundation models returned</span></div>
                  <div className="space-y-3 p-4 sm:p-5">
                    {evaluation.left.map((response) => (
                      <div key={`${response.model}-${response.badge}`} className="rounded-2xl border border-[#f3977d]/15 bg-white p-4">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.11em] text-ink-faint">{response.model}</p>
                        <p className="mt-2 text-sm font-medium leading-6 text-ink">{response.text}</p>
                        <p className="mt-3 inline-flex rounded-full bg-[#f3977d]/10 px-3 py-1.5 text-xs font-semibold text-[#b95245]">{response.badge}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overflow-hidden rounded-[24px] border border-cyan-deep/20 bg-[#f1fbfb]">
                  <div className="flex items-center gap-2 border-b border-cyan-deep/15 px-5 py-4 text-cyan-deep"><span aria-hidden="true">✓</span><span className="font-semibold">What Aprilio retrieved</span></div>
                  <div className="p-5 sm:p-6">
                    <p className="text-base font-medium leading-7 text-ink sm:text-lg sm:leading-8">{evaluation.right.text}</p>
                    <div className="mt-5 grid gap-2">
                      {evaluation.right.findings.map((finding, index) => (
                        <div key={finding.label} className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-cyan-deep/10 bg-white/80 p-3.5">
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan/20 font-mono text-[10px] font-bold text-cyan-deep">{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.11em] text-cyan-deep">{finding.label}</p>
                            <p className="mt-1 text-sm font-medium leading-5 text-ink">{finding.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-2xl border border-success/20 bg-white/80 p-4"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-success">Source basis</p><p className="mt-2 text-sm font-semibold leading-6 text-ink">{evaluation.right.citation}</p></div>
                    {evaluation.right.extras.map((extra) => <p key={extra.text} className="mt-3 inline-flex rounded-full border border-cyan-deep/20 bg-cyan/10 px-3 py-1.5 text-xs font-semibold text-cyan-deep">{extra.text}</p>)}
                    <button type="button" onClick={() => setFullOutput(evaluation)} className="mt-5 flex w-full items-center justify-between rounded-full bg-ink px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(16,37,66,.18)]">
                      <span>View full system output</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                    <p className="mt-2 text-center text-[11px] leading-5 text-ink-faint">Open the complete captured response, including tables, evidence notes, and references.</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 border-l-2 border-cyan-deep/35 pl-4 text-sm leading-6 text-ink-muted">{evaluation.annotation}</p>
            </motion.div>
          </AnimatePresence>

          <div className="grid border-t border-ink/10 bg-mist/55 sm:grid-cols-3">
            {[['Comparison set', '5 frontier models'], ['Clinical scope', '3 oncology questions'], ['Validation status', 'External review invited']].map(([label, value], index) => (
              <div key={label} className={`px-6 py-5 ${index > 0 ? 'border-t border-ink/10 sm:border-l sm:border-t-0' : ''}`}><p className="font-mono text-[10px] font-bold uppercase tracking-[0.11em] text-ink-faint">{label}</p><p className="mt-2 text-sm font-semibold text-ink">{value}</p></div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-ink/10 pt-8 lg:grid-cols-[auto_1fr] lg:items-start">
          <div><p className="eyebrow text-cyan-deep">Methods and research notes</p><Link href="/experience" className="mt-4 inline-flex text-sm font-bold text-ink underline decoration-cyan-deep/35 underline-offset-8">Open the full evaluation <span aria-hidden="true">↗</span></Link></div>
          <div className="grid gap-3 md:grid-cols-3 lg:ml-auto lg:max-w-4xl">
            {evaluationNotes.map((note) => (
              <Link key={note.href} href={note.href} className="group rounded-2xl border border-ink/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-cyan-deep/25"><p className="font-mono text-[9px] font-bold uppercase tracking-[0.11em] text-cyan-deep">{note.type}</p><p className="mt-2 text-sm font-semibold leading-5 text-ink group-hover:text-cyan-deep">{note.title}</p></Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
    <AnimatePresence>
      {fullOutput && <FullOutputModal evaluation={fullOutput} onClose={() => setFullOutput(null)} />}
    </AnimatePresence>
    </>
  )
}

function ResearchCollaborate() {
  return (
    <section id="collaborate" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="absolute inset-0 opacity-[0.13] soft-grid" aria-hidden="true" />
      <div className="absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan/20 blur-3xl" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow text-cyan">Research collaboration</p>
            <h2 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] sm:text-7xl">Help us study retrieval where the knowledge is real.</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-lg leading-8 text-white/70">We are looking for clinical, academic, and knowledge-source partners who want to evaluate grounded retrieval within a clearly governed research setting.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link href="/work-with-us" className="button-link bg-cyan text-ink hover:shadow-[0_16px_40px_rgba(95,225,230,.22)]">Discuss a collaboration <span aria-hidden="true">↗</span></Link><Link href="/about" className="button-link border border-white/20 bg-white/5 text-white">Meet the team</Link></div>
          </div>
        </div>
        <div className="mt-14 grid overflow-hidden rounded-[28px] border border-white/15 md:grid-cols-2 lg:grid-cols-4">
          {collaborationModes.map((mode, index) => (
            <article key={mode.title} className={`min-h-[260px] bg-white/[0.045] p-7 backdrop-blur-sm ${index > 0 ? 'border-t border-white/15 md:border-t-0 md:border-l' : ''} ${index === 2 ? 'md:border-l-0 lg:border-l' : ''}`}>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cyan">{mode.tag}</span>
              <h3 className="mt-8 text-2xl font-semibold leading-tight">{mode.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/65">{mode.copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-factum/25 bg-factum/[0.07] px-6 py-5 text-sm leading-6 text-white/70 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <span className="eyebrow shrink-0 text-factum">Governance first</span>
          <p className="mt-3 max-w-4xl sm:mt-0">Every collaboration should define permitted use, access, retention, attribution, publication, and data handling before research begins.</p>
        </div>
      </Container>
    </section>
  )
}

function ResearchFooter() {
  return (
    <footer className="border-t border-ink/10 bg-paper py-12">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div><AprilioWordmark placement="footer" /><p className="mt-2 max-w-md text-sm leading-6 text-ink-muted">Researching structure-first retrieval for changing medical knowledge.</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink-muted"><a href="#research-agenda">Research</a><a href="#research-method">Method</a><a href="#evaluations">Evaluations</a><a href="#collaborate">Collaborate</a><Link href="/blog">Technical journal</Link></div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Aprilio Research</span><span>Research-stage system · Not for clinical use</span></div>
      </Container>
    </footer>
  )
}

export default function ResearchLanding() {
  return (
    <>
      <Navigation variant="research" />
      <main>
        <ResearchHero />
        <ResearchAgenda />
        <ResearchMethod />
        <ResearchEvaluation />
        <ResearchCollaborate />
      </main>
      <ResearchFooter />
    </>
  )
}
