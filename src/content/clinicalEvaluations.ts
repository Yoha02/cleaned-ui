export interface ModelResponse {
  model: string
  text: string
  badge: string
  pulse?: boolean
}

export interface ClinicalEvaluation {
  id: number
  shortLabel: string
  question: string
  left: ModelResponse[]
  right: {
    text: string
    findings: { label: string; text: string }[]
    citation: string
    extras: { text: string; variant: 'success' | 'info' }[]
  }
  fullOutput: {
    src: string
    width: number
    height: number
    alt: string
  }
  annotation: string
}

export const clinicalEvaluations: ClinicalEvaluation[] = [
  {
    id: 1,
    shortLabel: 'HCC',
    question: 'What are preferred first-line systemic treatment options for hepatocellular carcinoma?',
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
      text: 'For unresectable or metastatic HCC with preserved liver function, retrieves atezolizumab + bevacizumab, durvalumab + tremelimumab, and nivolumab + ipilimumab as preferred first-line options. Lenvatinib and sorafenib remain alternatives when immunotherapy or VEGF inhibition is unsuitable.',
      findings: [
        {
          label: 'Preferred regimens',
          text: 'Atezolizumab + bevacizumab, durvalumab + tremelimumab, and nivolumab + ipilimumab.',
        },
        {
          label: 'Outcome evidence',
          text: 'Surfaces OS and response evidence from IMbrave150, HIMALAYA, and CheckMate 9DW.',
        },
        {
          label: 'Clinical boundary',
          text: 'Retains lenvatinib or sorafenib when immunotherapy or VEGF inhibition is unsuitable.',
        },
      ],
      citation: 'ASCO guideline + NCI PDQ + FDA approval, updated April 2025',
      extras: [
        {
          text: 'Current approval surfaced: nivolumab + ipilimumab, April 11, 2025',
          variant: 'info',
        },
      ],
    },
    fullOutput: {
      src: '/evaluation-outputs/hcc-full-output.png',
      width: 2058,
      height: 2324,
      alt: 'Full Aprilio system output for the hepatocellular carcinoma evaluation question',
    },
    annotation: 'The prototype separates preferred immunotherapy combinations from established alternatives and surfaces the approval date that changed the treatment landscape.',
  },
  {
    id: 2,
    shortLabel: 'NSCLC',
    question: 'For metastatic NSCLC with an ERBB2 mutation, what are systemic therapy options?',
    left: [
      {
        model: 'GPT-5.4',
        text: 'Recommends platinum-doublets + pembrolizumab as first-line. Lists zongertinib only as second-line',
        badge: 'Contradicts current evidence',
      },
      {
        model: 'Perplexity',
        text: 'Cites 2026 guidance but does not recommend zongertinib as first-line',
        badge: 'Misses FDA-approved first-line therapy',
      },
      {
        model: 'All 5 models',
        text: 'None mentioned sevabertinib (FDA approved November 2025)',
        badge: 'Therapy omitted entirely',
      },
    ],
    right: {
      text: 'Identifies zongertinib and sevabertinib as preferred HER2-selective options for metastatic non-squamous NSCLC with ERBB2 tyrosine kinase domain mutations, with trastuzumab deruxtecan as an established HER2-directed alternative.',
      findings: [
        {
          label: 'Preferred options',
          text: 'Zongertinib and sevabertinib for HER2 TKI-domain activating mutations.',
        },
        {
          label: 'Efficacy retrieved',
          text: 'Zongertinib: 71% ORR and 12.4-month median PFS. Sevabertinib: 64% ORR and 8.3-month median PFS.',
        },
        {
          label: 'Alternatives preserved',
          text: 'Separates trastuzumab deruxtecan and datopotamab deruxtecan from the preferred HER2-selective TKIs.',
        },
      ],
      citation: 'FDA approvals + phase 1/2 evidence, updated February 2026',
      extras: [
        {
          text: 'Latest approval surfaced: zongertinib indication expansion, February 26, 2026',
          variant: 'info',
        },
      ],
    },
    fullOutput: {
      src: '/evaluation-outputs/nsclc-full-output.png',
      width: 2054,
      height: 2164,
      alt: 'Full Aprilio system output for the metastatic NSCLC evaluation question',
    },
    annotation: 'The retrieved evidence includes both recent HER2-selective approvals and distinguishes them from the established antibody-drug conjugate alternative.',
  },
  {
    id: 3,
    shortLabel: 'Lymphoma',
    question: 'Treatment options for relapsed follicular lymphoma (>12 months, not transplant candidate)?',
    left: [
      {
        model: 'Claude 4.6',
        text: 'Lists tazemetostat without its biomarker and line-of-therapy limits',
        badge: 'Important evidence boundary omitted',
        pulse: true,
      },
      {
        model: 'Claude 4.6',
        text: 'Includes PI3K inhibitors',
        badge: 'Nearly all removed from market',
      },
      {
        model: 'DeepSeek',
        text: 'Recommends retreatment with bendamustine-rituximab as the primary option',
        badge: 'Misses newer preferred combinations',
      },
    ],
    right: {
      text: 'Retrieves epcoritamab + lenalidomide + rituximab and tafasitamab + lenalidomide + rituximab as preferred regimens after prior therapy. It separates established alternatives and restricts tazemetostat to its biomarker- and line-specific evidence.',
      findings: [
        {
          label: 'Preferred regimens',
          text: 'Epcoritamab + R² and tafasitamab + R² after prior therapy.',
        },
        {
          label: 'Phase 3 evidence',
          text: 'EPCORE FL-1: 95% ORR and PFS HR 0.21. InMIND: 22.4-month median PFS and HR 0.43.',
        },
        {
          label: 'Evidence boundary',
          text: 'Restricts tazemetostat to EZH2 or later-line evidence and explicitly surfaces unsupported retrieval gaps.',
        },
      ],
      citation: 'FDA approvals + phase 3 evidence, updated November 2025',
      extras: [
        {
          text: 'Recent approvals surfaced: epcoritamab and tafasitamab combinations',
          variant: 'info',
        },
      ],
    },
    fullOutput: {
      src: '/evaluation-outputs/lymphoma-full-output.png',
      width: 2069,
      height: 2385,
      alt: 'Full Aprilio system output for the relapsed follicular lymphoma evaluation question',
    },
    annotation: 'The prototype preserves the conditions attached to each option instead of presenting every retrieved therapy as interchangeable.',
  },
]
