import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aprilio.ai'),
  title: {
    default: 'Aprilio | Verified knowledge for high-stakes decisions',
    template: '%s | Aprilio',
  },
  description:
    'Aprilio turns complex, changing knowledge bases into current, verifiable Factums with exact source provenance.',
  icons: {
    icon: '/brand/aprilio-icon.jpg',
    apple: '/brand/aprilio-icon.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aprilio.ai',
    siteName: 'Aprilio',
    title: 'Aprilio | Verified knowledge for high-stakes decisions',
    description:
      'Structurally grounded retrieval for current answers, exact provenance, and AI that knows when to stop.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aprilio | Verified knowledge for high-stakes decisions',
    description:
      'Structurally grounded retrieval for current answers, exact provenance, and AI that knows when to stop.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
