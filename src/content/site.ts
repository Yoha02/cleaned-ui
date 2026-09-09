export const siteNavigation = [
  { href: '/#research-agenda', label: 'Research' },
  { href: '/architecture', label: 'Method' },
  { href: '/#evaluations', label: 'Evaluations' },
  { href: '/blog', label: 'Research Notes' },
  { href: '/about', label: 'Team' },
]

export const team = [
  {
    initials: 'ET',
    name: 'Ebrahim Tarshizi, PhD, MBA',
    role: 'Co-founder · Operations & research',
    bio: 'Academic partnerships, research coordination, and operational execution.',
  },
  {
    initials: 'GT',
    name: 'Gary Takahashi, MD, MS, FACP',
    role: 'Co-founder · Lead scientist',
    bio: 'Medical oncologist and creator of the original guideline retrieval system.',
  },
  {
    initials: 'EM',
    name: 'Eyoha Mengistu, MS',
    role: 'Co-founder · Product & automation',
    bio: 'Product systems, automation, interface design, and market development.',
  },
]

export const architectureStages = [
  {
    number: '01',
    eyebrow: 'The map',
    title: 'Identify structure and update the ontology',
    agent: 'Cartographer agent',
    description:
      'Reads medical references, preserves their hierarchy, and creates machine-readable nodes and relationships.',
    output: 'Ontology + source map',
  },
  {
    number: '02',
    eyebrow: 'The retrieval',
    title: 'Attach intent to navigational anchors',
    agent: 'Semantic annotator',
    description:
      'Links query topics to sections, pages, citations, evidence grades, and current external signals.',
    output: 'Provenance-tagged evidence',
  },
  {
    number: '03',
    eyebrow: 'The synthesis',
    title: 'Curate an auditable response',
    agent: 'Architect',
    description:
      'Builds a response from collected Factums and stops when the available evidence cannot support a claim.',
    output: 'Verified, current Factum',
  },
]

export const applications = [
  {
    index: 'A',
    title: 'Clinical knowledge publishers',
    description:
      'Turn changing guideline libraries into traceable, licensable intelligence without flattening their decision logic.',
    tags: ['Licensing', 'White-label', 'Dataset harnesses'],
  },
  {
    index: 'B',
    title: 'Health systems',
    description:
      'Give care teams current guidance with the evidence boundaries and audit trail enterprise medicine requires.',
    tags: ['Private deployment', 'Auditability', 'Workflow integration'],
  },
  {
    index: 'C',
    title: 'AI & clinical platforms',
    description:
      'Add grounded retrieval, failure attribution, and auditable answers to an existing AI product.',
    tags: ['API layer', 'Model agnostic', 'Safety tooling'],
  },
]

export const benchmarkRuns = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  aprilio: true,
  frontier: false,
}))
