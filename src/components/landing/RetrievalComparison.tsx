'use client'

import { motion } from 'framer-motion'

const ink = '#102542'
const muted = '#52627a'
const line = '#7f8ca0'
const cyan = '#159ca5'
const coral = '#ff8e73'
const violet = '#7768d8'
const factum = '#f6c85f'

function ArrowDefs({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
      </marker>
    </defs>
  )
}

function Label({ x, y, children, size = 17, weight = 600, color = ink, anchor = 'middle' }: { x: number; y: number; children: React.ReactNode; size?: number; weight?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
  return <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-heading)" fontSize={size} fontWeight={weight} fill={color}>{children}</text>
}

function SubLabel({ x, y, children, anchor = 'middle', size = 13.75 }: { x: number; y: number; children: React.ReactNode; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
  return <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-body)" fontSize={size} fill={muted}>{children}</text>
}

function FlowPacket({ path, color = cyan, delay = 0, duration = 1.35, radius = 4 }: { path: string; color?: string; delay?: number; duration?: number; radius?: number }) {
  return (
    <circle r={radius} fill={color} opacity="0">
      <animateMotion path={path} dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.18;0.82;1" dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  )
}

function RagDiagram() {
  return (
    <article data-testid="rag-architecture" className="overflow-x-auto rounded-[24px] border border-ink/12 bg-[#f8f7f3] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-faint">Standard RAG</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">Similarity search pipeline</h3>
        </div>
        <span className="rounded-full bg-coral/10 px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-coral">Probabilistic</span>
      </div>

      <svg className="mt-2 h-[500px] w-full min-w-[520px] lg:min-w-0" viewBox="0 0 600 620" role="img" aria-label="Standard RAG architecture diagram showing query and medical references embedded and routed through vector similarity search to an output">
        <ArrowDefs id="rag-arrow" color={line} />

        <g stroke={line} strokeWidth="1.5" fill="none" markerEnd="url(#rag-arrow)">
          <path d="M110 92 V145" />
          <path d="M465 102 V145" />
          <path d="M110 217 V312 H187" />
          <path d="M465 217 V263" />
          <path d="M393 315 H365" />
          <path d="M276 372 V470" />
        </g>

        <rect x="35" y="35" width="150" height="57" rx="12" fill="#fff1ed" stroke={coral} strokeOpacity=".55" />
        <Label x={110} y={69}>Query</Label>

        <g>
          <rect x="365" y="30" width="200" height="72" rx="12" fill="white" stroke={line} strokeOpacity=".55" />
          <path d="M365 48 H565 M382 30 V102" stroke={line} strokeOpacity=".45" />
          <Label x={465} y={66}>Medical references</Label>
          <SubLabel x={465} y={84}>guidelines and textbooks</SubLabel>
        </g>

        <rect x="35" y="145" width="150" height="72" rx="12" fill="white" stroke={line} strokeOpacity=".55" />
        <Label x={110} y={178}>Tokenization</Label>
        <Label x={110} y={198}>and embedding</Label>

        <rect x="390" y="145" width="150" height="72" rx="12" fill="white" stroke={line} strokeOpacity=".55" />
        <Label x={465} y={178}>Tokenization</Label>
        <Label x={465} y={198}>and embedding</Label>

        <g aria-label="Animated vector database">
          <rect x="393" y="280" width="144" height="76" fill="#f1f0ed" stroke={line} strokeOpacity=".45" />
          <ellipse cx="465" cy="280" rx="72" ry="20" fill="white" stroke={line} strokeOpacity=".55" />
          <ellipse cx="465" cy="356" rx="72" ry="20" fill="#e9e7e4" stroke={line} strokeOpacity=".55" />
          {[0, 1, 2].map((dot) => (
            <motion.circle key={dot} r="4" fill={dot === 2 ? coral : ink} opacity={dot === 2 ? .9 : .25} animate={{ cx: [430 + dot * 18, 493 - dot * 13, 443 + dot * 11], cy: [292 + dot * 9, 326 - dot * 4, 343 - dot * 8] }} transition={{ duration: 3.5 + dot * .4, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
          <Label x={465} y={397}>Vector database</Label>
          <SubLabel x={465} y={415}>embedded, flattened chunks</SubLabel>
        </g>

        <polygon points="276,258 365,315 276,372 187,315" fill="white" stroke={line} strokeWidth="1.5" />
        <Label x={276} y={311}>Similarity</Label>
        <Label x={276} y={331}>search</Label>

        <ellipse cx="276" cy="515" rx="92" ry="45" fill="#fff1ed" stroke={coral} strokeOpacity=".65" />
        <Label x={276} y={512}>Generated output</Label>
        <SubLabel x={276} y={532}>most probable answer</SubLabel>

        <motion.circle
          r="5"
          fill={coral}
          animate={{
            cx: [110, 110, 187, 276, 276, 276],
            cy: [218, 312, 315, 372, 455, 515],
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </article>
  )
}

function GarDiagram() {
  return (
    <article data-testid="gar-architecture" className="overflow-x-auto rounded-[24px] border border-cyan-deep/25 bg-[#f1fbfa] p-4 shadow-[0_18px_45px_rgba(21,156,165,.08)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-deep">Grounded Adaptive Retrieval</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">Structured knowledge system</h3>
        </div>
        <span className="rounded-full bg-cyan/25 px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-cyan-deep">Structure-led</span>
      </div>

      <svg className="mt-2 h-[540px] w-full min-w-[560px] lg:min-w-0" viewBox="0 0 640 660" role="img" aria-label="Grounded Adaptive Retrieval architecture showing medical references, ontology, query intent, semantic annotation, external search, architect, and auditable output">
        <ArrowDefs id="gar-arrow" color={cyan} />

        <g stroke={cyan} strokeWidth="1.5" fill="none" markerEnd="url(#gar-arrow)">
          <path d="M452 88 V124" />
          <path d="M252 172 H314" markerStart="url(#gar-arrow)" />
          <path d="M452 226 V264" />
          <path d="M104 315 V360" />
          <path d="M190 397 H288" />
          <path d="M104 428 V478" />
          <path d="M224 514 H326" />
          <path d="M452 420 V462" />
          <path d="M452 585 V618" />
        </g>

        <g aria-label="Data packets moving between architecture components">
          <FlowPacket path="M452 88 V124" color={factum} delay={0} />
          <FlowPacket path="M252 172 H314" color={violet} delay={0.45} duration={1.5} />
          <FlowPacket path="M452 226 V264" color={cyan} delay={0.9} />
          <FlowPacket path="M104 315 V360" color={coral} delay={0.25} />
          <FlowPacket path="M190 397 H288" color={coral} delay={0.95} duration={1.55} />
          <FlowPacket path="M104 428 V478" color={factum} delay={1.45} />
          <FlowPacket path="M452 420 V462" color={cyan} delay={1.7} />
          <FlowPacket path="M224 514 H326" color={factum} delay={2.05} duration={1.55} />
          <FlowPacket path="M452 585 V618" color={cyan} delay={2.45} duration={1.25} />
        </g>

        <g>
          <rect x="340" y="18" width="224" height="70" rx="12" fill="white" stroke={line} strokeOpacity=".55" />
          <path d="M340 37 H564 M358 18 V88" stroke={line} strokeOpacity=".42" />
          <Label x={452} y={60}>Medical references</Label>
        </g>

        <g aria-label="Animated ontology">
          <polygon points="84,116 194,116 252,172 194,228 84,228 26,172" fill="white" stroke={cyan} strokeOpacity=".55" />
          <path d="M139 134 V157 M139 157 L98 184 M139 157 V188 M139 157 L180 184" stroke={cyan} strokeOpacity=".38" strokeWidth="2.4" fill="none" />
          <motion.circle cx="139" cy="134" r="14" fill="none" stroke={cyan} strokeOpacity=".25" animate={{ r: [10, 16, 10], opacity: [.2, .55, .2] }} transition={{ duration: 2.8, repeat: Infinity }} />
          <circle cx="139" cy="134" r="8.5" fill="#5fe1e6" />
          <circle cx="139" cy="157" r="4" fill={cyan} fillOpacity=".28" />
          <circle cx="98" cy="184" r="6.5" fill={violet} />
          <circle cx="139" cy="188" r="6.5" fill={factum} />
          <circle cx="180" cy="184" r="6.5" fill={coral} />
          <motion.circle r="3.5" fill={cyan} animate={{ cx: [139, 98], cy: [157, 184], opacity: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }} />
          <motion.circle r="3.5" fill={cyan} animate={{ cx: [139, 180], cy: [157, 184], opacity: [0, 1, 0] }} transition={{ duration: 1.6, delay: .65, repeat: Infinity, ease: 'linear' }} />
        <Label x={139} y={216} size={15.5}>Ontology map</Label>
        </g>

        <rect x="314" y="124" width="276" height="102" rx="18" fill="#dfeafb" stroke="#789bc9" strokeOpacity=".6" />
        <Label x={452} y={182} size={21}>Cartographer</Label>

        <rect x="36" y="262" width="136" height="53" rx="10" fill="#fff1ed" stroke={coral} strokeOpacity=".6" />
        <Label x={104} y={295}>Query</Label>

        <rect x="18" y="360" width="172" height="68" rx="4" fill="white" stroke={line} strokeOpacity=".55" />
        <Label x={104} y={390}>Query intent</Label>

        <rect x="288" y="264" width="320" height="156" rx="22" fill="#e4f1df" stroke="#82aa78" strokeOpacity=".65" />
        <Label x={448} y={350} size={21}>Semantic Annotator</Label>

        <polygon points="34,478 238,478 224,550 20,550" fill="white" stroke={line} strokeOpacity=".6" />
        <Label x={129} y={507}>External search</Label>

        <rect x="326" y="462" width="252" height="123" rx="18" fill="#eee9f5" stroke={violet} strokeOpacity=".55" />
        <Label x={452} y={532} size={21}>Architect</Label>

        <ellipse cx="452" cy="638" rx="104" ry="20" fill="#e6f8f7" stroke={cyan} strokeOpacity=".7" />
        <Label x={452} y={644} size={17}>Auditable output</Label>
      </svg>
    </article>
  )
}

export default function RetrievalComparison() {
  return (
    <div data-testid="architecture-comparison" className="relative left-1/2 mt-8 w-[min(1360px,calc(100vw-64px))] -translate-x-1/2 rounded-[30px] border border-ink/10 bg-white/75 p-3 shadow-[0_24px_70px_rgba(16,37,66,.09)] backdrop-blur sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-4 px-1">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-cyan-deep">Architecture comparison</p>
          <p className="mt-1 text-sm font-semibold text-ink">One changing source set. Two fundamentally different systems.</p>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint sm:flex"><span className="h-2 w-2 rounded-full bg-coral" /> packets show data in motion</div>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <RagDiagram />
        <GarDiagram />
      </div>
    </div>
  )
}
