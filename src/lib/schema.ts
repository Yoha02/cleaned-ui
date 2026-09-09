export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aprilio',
    url: 'https://aprilio.ai',
    logo: 'https://aprilio.ai/brand/aprilio-icon.jpg',
    description:
      'Aprilio is a multidisciplinary research effort studying structure-first retrieval for changing medical knowledge.',
    foundingDate: '2025',
    founders: [
      {
        '@type': 'Person',
        name: 'Gary Takahashi, MD, MS, FACP',
        jobTitle: 'Co-founder and Lead Scientist',
        description: 'Medical oncologist and creator of the original guideline retrieval system.',
      },
      {
        '@type': 'Person',
        name: 'Eyoha Mengistu, MS',
        jobTitle: 'Co-founder, Product and Automation',
      },
      {
        '@type': 'Person',
        name: 'Ebrahim Tarshizi, PhD, MBA',
        jobTitle: 'Co-founder, Operations and Research',
      },
    ],
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'General Inquiries',
      url: 'https://aprilio.ai/contact',
    },
  }
}

export function articleSchema({
  title,
  description,
  datePublished,
  dateModified,
  slug,
  author = 'Aprilio Research',
}: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  slug: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://aprilio.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aprilio',
      url: 'https://aprilio.ai',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aprilio.ai/blog/${slug}`,
    },
    url: `https://aprilio.ai/blog/${slug}`,
  }
}

export function medicalWebPageSchema({
  title,
  description,
  url,
}: {
  title: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    description,
    url,
    audience: {
      '@type': 'MedicalAudience',
      audienceType: 'Clinician',
    },
    reviewedBy: {
      '@type': 'Person',
      name: 'Gary Takahashi, MD, MS, FACP',
      jobTitle: 'Medical Oncologist',
    },
  }
}

export function faqSchema(
  items: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function personSchema({
  name,
  jobTitle,
  description,
  url,
}: {
  name: string
  jobTitle: string
  description?: string
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    worksFor: {
      '@type': 'Organization',
      name: 'Aprilio',
      url: 'https://aprilio.ai',
    },
  }
}
