import Image from 'next/image'

export function AprilioWordmark({ placement = 'navigation', priority = false }: { placement?: 'navigation' | 'footer'; priority?: boolean }) {
  const isFooter = placement === 'footer'

  return (
    <span
      data-brand="aprilio-wordmark"
      className={`relative block shrink-0 ${isFooter ? 'h-14 w-[180px]' : 'h-16 w-[204px]'}`}
      aria-hidden="true"
    >
      <Image
        src="/brand/aprilio-wordmark.svg"
        alt=""
        fill
        priority={priority}
        sizes={isFooter ? '180px' : '204px'}
        className="pointer-events-none select-none object-contain"
      />
    </span>
  )
}

export function AprilioMark({ size = 'medium' }: { size?: 'medium' | 'large' }) {
  const isLarge = size === 'large'

  return (
    <span
      data-brand="aprilio-mark"
      className={`relative block shrink-0 overflow-hidden ${isLarge ? 'h-16 w-16' : 'h-12 w-12'}`}
      aria-hidden="true"
    >
      <Image
        src="/brand/aprilio-icon.jpg"
        alt=""
        width={352}
        height={369}
        sizes={isLarge ? '100px' : '80px'}
        className={`pointer-events-none absolute max-w-none select-none mix-blend-multiply ${isLarge ? '-left-[22px] -top-[22px] w-[108px]' : '-left-[17px] -top-[18px] w-[82px]'}`}
      />
    </span>
  )
}
