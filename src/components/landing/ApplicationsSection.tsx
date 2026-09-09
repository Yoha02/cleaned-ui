import Container from '@/components/ui/Container'
import { applications } from '@/content/site'

export default function ApplicationsSection() {
  return (
    <section id="applications" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="max-w-4xl">
          <div>
            <p className="eyebrow text-cyan-deep">Enterprise infrastructure</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-ink sm:text-5xl lg:text-6xl">One architecture. Three ways to deploy it.</h2>
          </div>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {applications.map((application, index) => (
            <article key={application.index} className={`relative overflow-hidden rounded-[26px] border border-ink/10 p-6 sm:p-7 ${index === 1 ? 'bg-mist' : index === 2 ? 'bg-[#f2efff]' : 'bg-[#eefafa]'}`}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white font-mono text-xs font-bold text-ink shadow-sm">{application.index}</span>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-ink">{application.title}</h3>
              <p className="mt-4 text-base leading-7 text-ink-muted">{application.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">{application.tags.map((tag) => <span key={tag} className="rounded-full border border-ink/10 bg-white/60 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted">{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
