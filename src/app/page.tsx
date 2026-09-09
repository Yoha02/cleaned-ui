import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Hero from '@/components/landing/Hero'
import LiveTraceSection from '@/components/landing/LiveTraceSection'
import WhyAprilio from '@/components/landing/WhyAprilio'
import ProofSection from '@/components/landing/ProofSection'
import ApplicationsSection from '@/components/landing/ApplicationsSection'
import ResearchLanding from '@/components/landing/ResearchLanding'
import { organizationSchema } from '@/lib/schema'

export default function Home() {
  const schema = organizationSchema()
  const researchLandingEnabled = process.env.NEXT_PUBLIC_RESEARCH_LANDING === 'true'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {researchLandingEnabled ? (
        <ResearchLanding />
      ) : (
        <>
          <Navigation />
          <main>
            <Hero />
            <LiveTraceSection />
            <WhyAprilio />
            <ProofSection />
            <ApplicationsSection />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
