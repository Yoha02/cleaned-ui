import Link from 'next/link'
import { siteNavigation } from '@/content/site'
import { AprilioWordmark } from '@/components/BrandLogo'

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Aprilio home">
              <AprilioWordmark placement="footer" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-ink-muted">
              A multidisciplinary research effort studying structure-first retrieval for changing medical knowledge.
            </p>
          </div>

          <div>
            <p className="eyebrow text-ink-muted">Navigate</p>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {siteNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-ink-muted hover:text-ink">
                  {item.label}
                </Link>
              ))}
              <Link href="/#collaborate" className="text-sm text-ink-muted hover:text-ink">Collaborate</Link>
            </div>
          </div>

          <div>
            <p className="eyebrow text-ink-muted">Research with Aprilio</p>
            <p className="mt-4 text-sm leading-6 text-ink-muted">
              Governed knowledge sources, clinical evaluation, and external validation.
            </p>
            <Link href="/work-with-us" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
              Discuss a collaboration <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aprilio, LLC.</p>
          <p>Research-stage system · Not for clinical use</p>
        </div>
      </div>
    </footer>
  )
}
