'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import GradientText from '@/components/ui/GradientText'
import WhyItMatters from '@/components/landing/WhyItMatters'
import { clinicalEvaluations } from '@/content/clinicalEvaluations'
import { joinWaitlist } from './actions'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ModelResponse {
  model: string
  text: string
  badge: string
  pulse?: boolean
}

interface ClinicalQuestion {
  id: number
  question: string
  left: ModelResponse[]
  right: {
    text: string
    citation: string
    extras: { text: string; variant: 'success' | 'info' }[]
  }
  annotation: string
}

const clinicalQuestions: ClinicalQuestion[] = clinicalEvaluations
/*
  {
    id: 1,
    question:
      'What are preferred first-line systemic treatment options for hepatocellular carcinoma?',
    left: [
      {
        model: 'Perplexity',
        text: 'Recommends camrelizumab + rivoceranib as a first-line option',
        badge: 'FDA rejected twice (May 2024, March 2025)',
        pulse: true,
      },
      {
        model: 'DeepSeek',
        text: 'Includes sintilimab in preferred options',
        badge: 'Unavailable in the United States',
        pulse: true,
      },
    ],
    right: {
      text: 'Lists atezolizumab + bevacizumab, durvalumab + tremelimumab, ipilimumab + nivolumab, and tislelizumab as preferred first-line options, with selected TKIs for patients ineligible for immunotherapy.',
      citation: 'ESMO Guidelines, Hepatobiliary Cancers v2.2026, Pages 47–48',
      extras: [{ text: 'No conflicting external sources identified', variant: 'success' }],
    },
    annotation:
      "Perplexity\u2019s recommendation of camrelizumab\u2011rivoceranib is particularly concerning. This combination has been rejected twice by the FDA, yet the model presented it as a viable option. For patients with hepatocellular carcinoma, acting on this recommendation could mean receiving an unapproved therapy.",
  },
  {
    id: 2,
    question:
      'For metastatic NSCLC with an ERBB2 mutation, what are systemic therapy options?',
    left: [
      {
        model: 'GPT-5.4',
        text: 'Recommends platinum-doublets + pembrolizumab as first-line. Lists zongertinib only as second-line',
        badge: 'Contradicts current ESMO guidelines',
      },
      {
        model: 'Perplexity',
        text: "Cites ASCO 2026 guidelines but doesn\u2019t recommend zongertinib as first-line",
        badge: 'Misses FDA-approved first-line therapy',
      },
      {
        model: 'All 5 models',
        text: 'None mentioned sevabertinib (FDA approved Nov 2025)',
        badge: 'Therapy omitted entirely',
      },
    ],
    right: {
      text: 'Recommends zongertinib (Hernexeos) as preferred first-line therapy (76% ORR, Beamion LUNG-1 trial), followed at progression by fam-trastuzumab deruxtecan-nxki or sevabertinib.',
      citation: 'ESMO Guidelines, NSCLC v5.2026, Pages 82–84',
      extras: [
        {
          text: 'Late-breaking: Zongertinib first-line expansion approved Feb 26, 2026',
          variant: 'info',
        },
      ],
    },
    annotation:
      'Zongertinib received expanded first-line approval on February 26, 2026, with a 76% objective response rate in the Beamion LUNG-1 trial. Every frontier model either missed it entirely or relegated it to second-line, a meaningful clinical difference for patients with limited options.',
  },
  {
    id: 3,
    question:
      'Treatment options for relapsed follicular lymphoma (>12 months, not transplant candidate)?',
    left: [
      {
        model: 'Claude 4.6',
        text: 'Lists tazemetostat as a treatment option',
        badge: 'Withdrawn March 9, 2026: MDS/leukemia safety signal',
        pulse: true,
      },
      {
        model: 'Claude 4.6',
        text: 'Includes PI3K inhibitors',
        badge: 'Nearly all removed from market',
      },
      {
        model: 'DeepSeek',
        text: 'Recommends retreatment with bendamustine-rituximab',
        badge: 'Guidelines recommend against this',
      },
    ],
    right: {
      text: 'Lists all current ESMO-recommended regimens including R\u00B2 + tafasitamab and R\u00B2 + epcoritamab. Notes bendamustine only if no prior exposure. Excludes withdrawn and discontinued agents.',
      citation: 'ESMO Guidelines, B-Cell Lymphomas v3.2026, Pages 128–131',
      extras: [],
    },
    annotation:
      "Tazemetostat was voluntarily withdrawn by Ipsen on March 9, 2026 after the SYMPHONY-1 trial showed an imbalance in secondary hematologic malignancies including MDS and acute leukemia. Recommending a withdrawn drug isn\u2019t just outdated. It\u2019s a potential safety hazard.",
  },
]
*/

const faqItems = [
  {
    q: 'What data sources does Grounded Retrieval use?',
    a: 'Primarily ESMO clinical practice guidelines as a structured oncology reference. The system also performs real-time internet search to capture late-breaking updates published between guideline revision cycles.',
  },
  {
    q: 'Does this replace clinical judgment?',
    a: "No. Grounded Retrieval is a clinical decision support tool that surfaces relevant guideline information and citations. All treatment decisions remain with the physician. The system\u2019s page-level citations are designed specifically to facilitate direct verification against source material.",
  },
  {
    q: 'Which LLM does it use? Can I use my own?',
    a: 'The architecture is model-agnostic. Our published study used GPT-4.1, a mid-tier model, and outperformed every frontier model tested. This demonstrates that the retrieval architecture matters more than model scale. The system can run with any LLM, including local models for data security.',
  },
  {
    q: 'Is patient data secure?',
    a: 'Grounded Retrieval processes clinical queries, not patient records. The system can be deployed on-premises or in private cloud environments. Model-agnostic design means it can run entirely locally, with no data leaving your infrastructure.',
  },
  {
    q: 'How current is the guideline data?',
    a: 'The system retrieves ESMO guidance at query time, helping keep the answer aligned with the latest available source. The complementary internet search captures developments published between guideline revision cycles.',
  },
]

const timelineModels = [
  { label: 'Gemini 3.1', date: 'Jan 2025', pct: 3, align: 'start' },
  { label: 'Claude 4.6', date: 'May 2025', pct: 25 },
  { label: 'GPT 5.4', date: 'Sep 2025', pct: 50 },
  { label: 'DeepSeek V3.2', date: 'Dec 2025', pct: 69 },
]

const timelineEvents = [
  { label: 'Zongertinib 1L approved', date: 'Feb 2026', pct: 81, lane: 0 },
  { label: 'Tazemetostat withdrawn', date: 'Mar 2026', pct: 88, lane: 1 },
]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
}

const ease = [0.25, 0.1, 0.25, 1] as const

const fadeSlideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
}

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
}

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG)                                                 */
/* ------------------------------------------------------------------ */

function IconPage({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function IconCheck({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function IconWarning({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function IconChevron({ open, className = 'w-5 h-5' }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`${className} transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Interactive Demo                                                   */
/* ------------------------------------------------------------------ */

function InteractiveDemo() {
  const [active, setActive] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)

  const advance = useCallback(() => {
    setActive((p) => (p + 1) % clinicalQuestions.length)
    setCycleKey((k) => k + 1)
  }, [])

  useEffect(() => {
    const id = setInterval(advance, 8000)
    return () => clearInterval(id)
  }, [advance, active])

  function selectQuestion(idx: number) {
    setActive(idx)
    setCycleKey((k) => k + 1)
  }

  const q = clinicalQuestions[active]

  return (
    <div className="relative">
      {/* Question selector + progress */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
        {clinicalQuestions.map((cq, i) => (
          <button
            key={cq.id}
            onClick={() => selectQuestion(i)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
              ${
                i === active
                  ? 'bg-teal/15 text-teal border border-teal/30'
                  : 'text-text-on-dark-muted hover:text-white hover:bg-white/5 border border-transparent'
              }
            `}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                i === active ? 'bg-teal text-dark-surface' : 'bg-white/10 text-white/60'
              }`}
            >
              {cq.id}
            </span>
            <span className="hidden sm:inline">Question {cq.id}</span>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-white/5 rounded-full mb-8 overflow-hidden">
        <motion.div
          key={`bar-${cycleKey}`}
          className="h-full bg-gradient-to-r from-teal to-purple rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 8, ease: 'linear' }}
        />
      </div>

      {/* Question text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`q-${active}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-center text-lg sm:text-xl font-semibold text-white mb-8 font-[family-name:var(--font-heading)]"
        >
          &ldquo;{q.question}&rdquo;
        </motion.p>
      </AnimatePresence>

      {/* Split panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`panels-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
        >
          {/* LEFT: Chatbot */}
          <div className="rounded-xl bg-dark-surface-light border border-danger/10 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-danger/5">
              <IconWarning className="w-4 h-4 text-danger" />
              <span className="text-sm font-semibold text-danger/90">What foundation models returned</span>
            </div>

            <motion.div
              className="p-5 space-y-4"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {q.left.map((resp, i) => (
                <motion.div
                  key={`${active}-l-${i}`}
                  variants={fadeSlideLeft}
                  className="rounded-lg bg-dark-surface/60 border border-white/5 p-4"
                >
                  <span className="text-xs font-mono font-semibold text-text-on-dark-muted tracking-wide uppercase">
                    {resp.model}
                  </span>
                  <p className="mt-1.5 text-sm text-text-on-dark leading-relaxed">
                    &ldquo;{resp.text}&rdquo;
                  </p>
                  <div className="mt-3">
                    <Badge variant="danger" pulse={resp.pulse}>
                      {resp.badge}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Grounded Retrieval */}
          <div className="rounded-xl bg-dark-surface-lighter border border-teal/10 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-teal/5">
              <IconCheck className="w-4 h-4 text-teal" />
              <span className="text-sm font-semibold text-teal">What the Aprilio prototype retrieved</span>
            </div>

            <motion.div
              className="p-5"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={fadeSlideUp}
                className="text-sm text-text-on-dark leading-relaxed"
              >
                &ldquo;{q.right.text}&rdquo;
              </motion.p>

              <motion.div
                variants={fadeSlideUp}
                className="mt-4 flex items-start gap-2 rounded-lg bg-success-bg border border-success/20 px-4 py-3"
              >
                <IconPage className="w-4 h-4 text-success mt-0.5 shrink-0" />
                <span className="text-sm text-success font-medium">{q.right.citation}</span>
              </motion.div>

              {q.right.extras.map((ext, i) => (
                <motion.div key={i} variants={fadeSlideUp} className="mt-3">
                  <Badge variant={ext.variant}>{ext.text}</Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Annotation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`ann-${active}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-6 rounded-lg border-l-2 border-teal/40 bg-white/[0.03] px-5 py-4"
        >
          <p className="text-sm text-text-on-dark-muted leading-relaxed italic">
            {q.annotation}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Timeline                                                           */
/* ------------------------------------------------------------------ */

function Timeline() {
  return (
    <div className="relative mt-12 select-none">
      {/* Scrollable wrapper for mobile */}
      <div className="overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
        <div className="relative h-64 min-w-[820px] px-2">
          {/* Main axis */}
          <div className="absolute left-2 right-2 top-[58%] h-px bg-white/25" />

          {/* Danger zone overlay */}
          <div
            className="absolute top-[27%] h-[31%] rounded-t-xl border border-b-0 border-danger/15 bg-danger/[0.07]"
            style={{ left: '69%', right: '0.5rem' }}
          >
            <span className="absolute left-4 top-3 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-danger/80">
              the danger zone
            </span>
          </div>

          {/* "Now" marker */}
          <div className="absolute right-2 top-[58%] z-20 -translate-y-1/2">
            <div className="h-3 w-3 rounded-full bg-teal ring-4 ring-teal/20" />
            <span className="absolute right-0 top-7 text-xs font-semibold text-teal">Now</span>
          </div>

          {/* Model cutoffs below line */}
          {timelineModels.map((m) => (
            <div
              key={m.label}
              className={`absolute top-[58%] flex flex-col ${m.align === 'start' ? 'items-start' : 'items-center'}`}
              style={{ left: `${m.pct}%`, transform: m.align === 'start' ? 'translateX(0)' : 'translateX(-50%)' }}
            >
              <div className="h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-dark-surface bg-purple" />
              <div className={`mt-2 flex flex-col ${m.align === 'start' ? 'items-start' : 'items-center'}`}>
                <span className="whitespace-nowrap text-xs font-semibold text-white">
                  {m.label}
                </span>
                <span className="text-[11px] text-text-on-dark-muted">{m.date}</span>
              </div>
            </div>
          ))}

          {/* Key events above line */}
          {timelineEvents.map((e) => (
            <div
              key={e.label}
              className="absolute top-[58%] z-10 flex flex-col items-center"
              style={{ left: `${e.pct}%`, transform: 'translateX(-50%)' }}
            >
              <div className="h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-dark-surface bg-danger" />
              <div
                className="absolute bottom-full flex w-44 flex-col items-center rounded-lg border border-danger/15 bg-dark-surface/85 px-3 py-2 text-center shadow-lg backdrop-blur-sm"
                style={{ marginBottom: `${16 + e.lane * 52}px` }}
              >
                <span className="whitespace-nowrap text-[11px] font-semibold text-danger">
                  {e.label}
                </span>
                <span className="mt-0.5 text-[10px] text-text-on-dark-muted">{e.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion                                                      */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-base font-medium text-white group-hover:text-teal transition-colors pr-4">
          {question}
        </span>
        <IconChevron open={open} className="w-5 h-5 text-text-on-dark-muted shrink-0" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text-on-dark-muted leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Waitlist Form                                                      */
/* ------------------------------------------------------------------ */

function WaitlistForm() {
  const [state, setState] = useState<{ submitted: boolean; message: string }>({
    submitted: false,
    message: '',
  })
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const fd = new FormData(e.currentTarget)
    const result = await joinWaitlist(fd)
    setState({ submitted: result.success, message: result.message })
    setPending(false)
  }

  if (state.submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
          <IconCheck className="w-7 h-7 text-success" />
        </div>
        <p className="text-xl font-semibold text-white font-[family-name:var(--font-heading)]">
          {state.message}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@institution.edu"
          className="w-full rounded-lg border border-white/10 bg-dark-surface-light px-4 py-3 text-sm text-white placeholder:text-text-on-dark-muted focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal/40 transition-all"
        />
      </div>

      <div>
        <label htmlFor="role" className="sr-only">
          Role
        </label>
        <select
          id="role"
          name="role"
          required
          defaultValue=""
          className="w-full rounded-lg border border-white/10 bg-dark-surface-light px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal/40 transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled className="text-text-on-dark-muted">
            Select your role
          </option>
          <option value="physician">Physician</option>
          <option value="health-system">Health System</option>
          <option value="researcher">Researcher</option>
          <option value="investor">Investor</option>
          <option value="other">Other</option>
        </select>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={pending}
      >
        {pending ? 'Submitting\u2026' : 'Get early access'}
      </Button>

      {state.message && !state.submitted && (
        <p className="text-sm text-danger text-center">{state.message}</p>
      )}
    </form>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ExperiencePage() {
  return (
    <>
      <Navigation variant="research" />

      <main className="bg-dark-surface min-h-screen">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          {/* Subtle radial gradient background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-teal/[0.06] via-purple/[0.03] to-transparent rounded-full blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-teal mb-4">
                Comparative evaluation
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-[family-name:var(--font-heading)]">
                Evaluating retrieval under{' '}
                <GradientText>changing evidence</GradientText>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 text-lg sm:text-xl text-text-on-dark-muted leading-relaxed max-w-2xl mx-auto"
            >
              Three oncology questions tested across five frontier models and Aprilio&apos;s research prototype. The comparison records omissions, outdated recommendations, and the source basis recovered by structure-first retrieval.
            </motion.p>
          </div>
        </section>

        {/* ── Interactive Demo ── */}
        <section className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <AnimateOnScroll>
              <InteractiveDemo />
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Why This Happens ── */}
        <section id="why-this-happens" className="scroll-mt-24 py-24 sm:py-32 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <AnimateOnScroll>
              <p className="text-sm font-semibold uppercase tracking-wider text-teal mb-3 text-center">
                Why this happens
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center font-[family-name:var(--font-heading)]">
                Training data goes stale.{' '}
                <span className="text-text-on-dark-muted">Oncology doesn&rsquo;t wait.</span>
              </h2>
              <p className="mt-6 text-lg text-text-on-dark-muted leading-relaxed text-center max-w-2xl mx-auto">
                Foundation models recall from training data. When that data is months old, the
                recommendations they surface can lag behind withdrawn drugs, new approvals, and
                updated guidelines.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <Timeline />
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
              <div className="mt-12 rounded-xl bg-teal/5 border border-teal/15 p-6 sm:p-8 text-center">
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                  <GradientText className="font-semibold">Grounded Retrieval</GradientText>{' '}
                  doesn&rsquo;t guess. It reads the latest guidelines and tells you exactly where to
                  verify.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Waitlist CTA ── */}
        <section className="py-24 sm:py-32 border-t border-white/5 bg-dark-surface-light/50">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <AnimateOnScroll>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">
                Participate in external validation
              </h2>
              <p className="mt-4 text-lg text-text-on-dark-muted leading-relaxed">
                We are inviting clinical researchers, domain experts, and governed knowledge-source partners to help test the method across new questions and source sets.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15}>
              <div className="mt-10">
                <WaitlistForm />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-on-dark-muted">
                <span>Built by a practicing medical oncologist</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span>Validated against 5 frontier models</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span>Provisional patent pending</span>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 sm:py-32 border-t border-white/5">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <AnimateOnScroll>
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center font-[family-name:var(--font-heading)] mb-12">
                Frequently asked questions
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="divide-y divide-white/5 border-t border-white/5">
                {faqItems.map((item) => (
                  <FAQItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>
      <WhyItMatters />
      <Footer />
    </>
  )
}
