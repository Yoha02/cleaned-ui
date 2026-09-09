'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Container from '@/components/ui/Container'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const team = [
  {
    initials: 'ET',
    name: 'Ebrahim Tarshizi, PhD, MBA',
    role: 'Co-founder, operations and academic partnerships',
    contribution: 'Leads operations, academic relationships, and research coordination across Aprilio’s clinical and institutional work.',
  },
  {
    initials: 'GT',
    name: 'Gary Takahashi, MD, MS, FACP',
    role: 'Co-founder and Lead Scientist',
    contribution: 'Board-certified medical oncologist and co-developer of the original grounded retrieval logic concept.',
  },
  {
    initials: 'EM',
    name: 'Eyoha Mengistu, MS',
    role: 'Co-founder, product, automation, and experience',
    contribution: 'Translates the architecture into a usable product, automated workflows, and an experience people can understand.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navigation variant="research" />
      <main>
        <section className="hero-light relative overflow-hidden pb-24 pt-36 sm:pb-28 sm:pt-44">
          <div className="hero-aurora absolute inset-0 opacity-65" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-[2vw] bottom-0 hidden select-none font-[family-name:var(--font-heading)] text-[11vw] font-semibold leading-none tracking-[-0.07em] text-ink/[0.025] lg:block" aria-hidden="true">TOGETHER</div>
          <Container className="relative">
            <AnimateOnScroll>
              <p className="eyebrow text-cyan-deep">Our story</p>
              <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-ink sm:text-6xl lg:text-7xl">One research question, examined across disciplines.</h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-ink-muted">Aprilio began with a clinical problem and grew around a shared belief: high-stakes knowledge should never lose its structure, source, or limits.</p>
            </AnimateOnScroll>
          </Container>
        </section>

        <section className="bg-mist py-20 sm:py-28">
          <Container>
            <AnimateOnScroll>
              <article className="rounded-[32px] border border-ink/10 bg-white p-7 shadow-sm sm:p-10 lg:p-14">
                <p className="eyebrow text-cyan-deep">How it started</p>
                <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-ink sm:text-5xl">
                  A clinical problem became the blueprint for{' '}
                  <span className="block pb-3 leading-[1.08]">
                    a <span className="mr-[0.08em] font-bold">new layer</span> of <span className="hero-gradient-text inline-block pb-3">medical intelligence.</span>
                  </span>
                </h2>

                <div className="mt-9 max-w-5xl space-y-7 text-xl leading-9 text-ink-muted">
                  <p>
                    Aprilio began with an observation seen in oncology practice: medical management guidance was changing faster than conventional tools could follow. Evidence moved, recommendations shifted, but conventional AI models would still produce confident answers, even after the ground had changed.
                  </p>

                  <p>
                    The issue was not simply search, and it was not just model accuracy. Medical knowledge needed structure before generation: a way to follow the organization of a source, to notice what had changed, and to keep every claim tied to what the evidence could actually support.
                  </p>

                  <p>
                    The impact of information deficiency is real. Physicians are not always able to get the intelligence they need at the point of care from sources they had come to trust. These sources of information were simply not structured to provide information that was reliably factual as well as up to date.
                  </p>

                  <p>
                    Solving this problem required a team of experts to manage various aspects of this problem. Understanding the research and academic coordination needed to move the work forward. Knowing how to engineer the systems architecture that would result in grounded information retrieval, free of the limitations present in standard models. Experience in product thinking, automation, and implementation of the experience layer needed to make the method usable and inspectable.
                  </p>

                  <p>
                    Together, the team developed the early retrieval logic into Grounded Adaptive Retrieval and a medical harness for Factums: answers that stay current, traceable, and bounded by evidence. Aprilio formed around a simple conviction: high-stakes knowledge should be usable without being separated from the sources that make it trustworthy.
                  </p>
                </div>
              </article>
            </AnimateOnScroll>
          </Container>
        </section>

        <section className="bg-paper py-20 sm:py-28">
          <Container>
            <AnimateOnScroll>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow text-cyan-deep">The team</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">Built across disciplines.</h2>
                </div>
                <p className="max-w-lg text-base leading-7 text-ink-muted">Clinical judgment, research coordination, systems thinking, and product craft meet around one shared architecture.</p>
              </div>
            </AnimateOnScroll>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {team.map((member, index) => (
                <AnimateOnScroll key={member.name} delay={index * 0.08}>
                  <article className="grid h-full grid-cols-[auto_1fr] gap-5 rounded-[24px] border border-ink/10 bg-white p-6 shadow-sm">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink font-mono text-sm font-bold text-cyan">{member.initials}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-ink">{member.name}</h3>
                      <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-deep">{member.role}</p>
                      <p className="mt-4 text-sm leading-6 text-ink-muted">{member.contribution}</p>
                    </div>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-ink py-20 text-white sm:py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="eyebrow text-cyan">What keeps us together</p>
                <blockquote className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-4xl">Make high-stakes knowledge usable without hiding the path back to truth.</blockquote>
              </div>
              <Link href="/work-with-us" className="button-link bg-factum text-ink">Work with the team <span aria-hidden="true">↗</span></Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
