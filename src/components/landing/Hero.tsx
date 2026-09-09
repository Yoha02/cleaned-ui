'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Container from '@/components/ui/Container'

const whenSuffixes = [
  'it’s wrong?',
  'cancer guidance changes?',
  'a better treatment emerges?',
  'it should stop?',
]

function CyclingWhenLine() {
  const [suffixIndex, setSuffixIndex] = useState(0)
  const [displayText, setDisplayText] = useState(whenSuffixes[0])
  const [phase, setPhase] = useState<'rest' | 'delete' | 'type'>('rest')

  useEffect(() => {
    const activeSuffix = whenSuffixes[suffixIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'rest') {
      timeout = setTimeout(() => setPhase('delete'), suffixIndex === 0 ? 3600 : 2400)
    }

    if (phase === 'delete') {
      timeout = setTimeout(() => {
        if (displayText.length > 0) {
          setDisplayText((text) => text.slice(0, -1))
        } else {
          setSuffixIndex((index) => (index + 1) % whenSuffixes.length)
          setPhase('type')
        }
      }, 34)
    }

    if (phase === 'type') {
      timeout = setTimeout(() => {
        if (displayText.length < activeSuffix.length) {
          setDisplayText(activeSuffix.slice(0, displayText.length + 1))
        } else {
          setPhase('rest')
        }
      }, 48)
    }

    return () => clearTimeout(timeout)
  }, [displayText, phase, suffixIndex])

  return (
    <motion.span
      className="hero-gradient-text -mb-[0.05em] block w-fit overflow-visible pb-[0.08em] leading-[1.08]"
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`when ${displayText}`}
    >
      when <span>{displayText}</span>
      <motion.span
        aria-hidden="true"
        className="ml-[0.035em] inline-block h-[0.78em] w-[0.035em] translate-y-[0.08em] rounded-full bg-cyan-deep"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.95, repeat: Infinity, times: [0, 0.48, 0.5, 1] }}
      />
    </motion.span>
  )
}

function StethoscopeWatermark() {
  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute right-[-8rem] top-[19%] hidden h-[460px] w-[460px] text-cyan-deep opacity-[0.13] mix-blend-multiply xl:block 2xl:right-[-4rem]"
      viewBox="0 0 420 420"
      fill="none"
      initial={{ opacity: 0, x: 26, rotate: 2.5 }}
      animate={{ opacity: 0.13, x: 0, rotate: [2.5, 1.2, 2.5] }}
      transition={{
        opacity: { delay: 0.85, duration: 1.1 },
        x: { delay: 0.85, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <motion.path
        d="M142 58C112 74 101 112 116 143C129 171 153 186 181 186C209 186 233 171 246 143C261 112 250 74 220 58"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 1.55, ease: 'easeInOut' }}
      />
      <motion.path
        d="M181 186V225C181 267 147 287 111 287C78 287 54 307 54 335C54 364 78 386 107 386C134 386 158 367 158 339"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.45, duration: 1.75, ease: 'easeInOut' }}
      />
      <path d="M122 58V30M240 58V30" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.72" />
      <circle cx="122" cy="27" r="10" fill="currentColor" opacity="0.72" />
      <circle cx="240" cy="27" r="10" fill="currentColor" opacity="0.72" />
      <circle cx="158" cy="339" r="29" stroke="currentColor" strokeWidth="10" opacity="0.82" />
      <motion.circle
        cx="158"
        cy="339"
        r="12"
        fill="currentColor"
        animate={{ scale: [0.82, 1.08, 0.82], opacity: [0.3, 0.58, 0.3] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '158px 339px' }}
      />
      <motion.circle
        cx="158"
        cy="339"
        r="44"
        stroke="currentColor"
        strokeWidth="2"
        animate={{ scale: [0.72, 1.1], opacity: [0.28, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
        style={{ transformOrigin: '158px 339px' }}
      />
    </motion.svg>
  )
}

function KnowledgeMiniMap() {
  return (
    <div className="mt-5 rounded-2xl border border-ink/10 bg-white/65 p-3 shadow-[0_14px_36px_rgba(16,37,66,.06)] backdrop-blur-sm">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        <div className="space-y-1.5">
          {['Guideline', 'Update', 'Evidence'].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-ink/8 bg-paper px-2 py-1.5 text-center font-mono text-[9px] font-bold uppercase tracking-[0.06em] text-ink-muted"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="relative grid h-full min-w-7 place-items-center" aria-hidden="true">
          <span className="font-mono text-sm text-cyan-deep">→</span>
          <motion.span
            className="absolute h-1.5 w-1.5 rounded-full bg-coral shadow-[0_0_12px_rgba(255,142,115,.55)]"
            animate={{ x: [-10, 0, 10], opacity: [0, 0.85, 0] }}
            transition={{ duration: 2.15, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        <motion.div
          className="relative overflow-hidden rounded-xl border border-cyan-deep/20 bg-cyan/10 px-2 py-4 text-center will-change-transform"
          initial={{ opacity: 0, x: -10, scale: 0.995 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, borderColor: 'rgba(21,156,165,.42)' }}
        >
          <motion.span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-deep/15" animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 3, repeat: Infinity }} />
          <motion.span
            className="absolute inset-x-4 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-deep/25 to-transparent"
            animate={{ opacity: [0.15, 0.55, 0.15], scaleX: [0.78, 1, 0.78] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="relative font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-cyan-deep">Ontology</span>
          <p className="relative mt-1 text-[11px] font-semibold text-ink">Source map</p>
        </motion.div>
        <div className="relative grid h-full min-w-7 place-items-center" aria-hidden="true">
          <span className="font-mono text-sm text-cyan-deep">→</span>
          <motion.span
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-deep shadow-[0_0_12px_rgba(21,156,165,.55)]"
            animate={{ x: [-10, 0, 10], opacity: [0, 0.85, 0] }}
            transition={{ duration: 2.15, delay: 0.82, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        <motion.div
          className="relative overflow-hidden rounded-xl bg-ink px-2 py-4 text-center text-white shadow-sm will-change-transform"
          initial={{ opacity: 0, x: -10, scale: 0.995 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.96, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
        >
          <motion.span
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(95,225,230,.22),transparent_58%)]"
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-factum">Factum</span>
          <p className="relative mt-1 text-[11px] font-semibold">Traceable</p>
        </motion.div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero-light relative flex min-h-[780px] items-center overflow-hidden bg-paper pb-16 pt-28 text-ink sm:min-h-[840px] sm:pb-20 sm:pt-32 lg:min-h-[90svh]">
      <div className="hero-aurora absolute inset-0 opacity-65" aria-hidden="true" />
      <div className="hero-noise absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <StethoscopeWatermark />
      <div className="pointer-events-none absolute -left-[2vw] top-[18%] hidden select-none font-[family-name:var(--font-heading)] text-[11vw] font-semibold leading-none tracking-[-0.07em] text-ink/[0.025] lg:block" aria-hidden="true">STRUCTURE</div>
      <div className="pointer-events-none absolute -right-[3vw] bottom-[2%] hidden select-none font-[family-name:var(--font-heading)] text-[10vw] font-semibold leading-none tracking-[-0.07em] text-ink/[0.028] lg:block" aria-hidden="true">KNOWLEDGE</div>

      <Container className="relative z-10">
        <div className="max-w-[1200px]">
          <p className="eyebrow text-cyan-deep">AI answers can sound right. They can still be wrong.</p>
          <h1 className="mt-8 max-w-[1180px] overflow-visible text-[clamp(3.75rem,7.2vw,8.1rem)] font-semibold leading-[1.01] tracking-[-0.045em] text-ink sm:mt-9 sm:tracking-[-0.055em]">
            <span className="block overflow-visible">Does your AI know</span>
            <CyclingWhenLine />
          </h1>

          <div className="mt-10 grid gap-8 border-t border-ink/12 pt-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <p className="max-w-2xl text-xl leading-8 text-ink-muted sm:text-[1.4rem] sm:leading-9">
                <strong className="font-semibold text-ink">Aprilio knows.</strong> It follows source structure and ontology so every answer stays current, traceable, and honest about its limits.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="#live-trace" className="button-link button-link-dark">See Aprilio work <span aria-hidden="true">↓</span></Link>
                <Link href="/architecture" className="button-link button-link-light">Explore the architecture <span aria-hidden="true">↗</span></Link>
              </div>
            </div>

            <div className="border-l-2 border-cyan-deep/35 pl-5 sm:pl-7">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-cyan-deep">Built around the knowledge</p>
              <p className="mt-3 max-w-xl text-lg font-semibold leading-7 tracking-[-0.02em] text-ink sm:text-xl sm:leading-8">
                Structure gives every answer somewhere to stand.
              </p>
              <KnowledgeMiniMap />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
