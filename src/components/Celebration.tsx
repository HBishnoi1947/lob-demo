import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import { Plate } from '@/components/Plate'
import { Shell } from '@/components/Shell'
import { CELEBRATION } from '@/content/screens'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PETAL_COUNT = 12
const PETAL_TINTS = ['var(--color-oxblood)', 'var(--color-gilt)', 'var(--color-rule)']

type Petal = {
  left: number
  tint: string
  delay: number
  duration: number
  drift: number
  spin: number
}

function makePetals(): Petal[] {
  return Array.from({ length: PETAL_COUNT }, (_, index) => ({
    left: Math.random() * 94,
    tint: PETAL_TINTS[index % PETAL_TINTS.length],
    delay: Math.random() * 6000,
    duration: 7000 + Math.random() * 5000,
    drift: (Math.random() - 0.5) * 120,
    spin: 180 + Math.random() * 420,
  }))
}

type Props = {
  onReplay: () => void
}

export function Celebration({ onReplay }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const reducedMotion = useReducedMotion()
  const petals = useMemo(() => (reducedMotion ? [] : makePetals()), [reducedMotion])

  useEffect(() => {
    document.title = CELEBRATION.docTitle
    headingRef.current?.focus()
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {petals.map((petal, index) => (
          <span
            key={index}
            className="anim-petal absolute top-0 block h-3.5 w-2.5 opacity-70"
            style={
              {
                left: `${petal.left}%`,
                background: petal.tint,
                borderRadius: '60% 40% 55% 45% / 50% 58% 42% 50%',
                '--delay': `${petal.delay}ms`,
                '--dur': `${petal.duration}ms`,
                '--drift': `${petal.drift}px`,
                '--spin': `${petal.spin}deg`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <Shell>
        <div className="flex flex-1 flex-col justify-center gap-8 text-center">
          <Plate illustration={CELEBRATION.illustration} />

          <div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="anim-copy text-[clamp(2rem,8.5vw,2.75rem)]"
              style={{ '--delay': '180ms' } as CSSProperties}
            >
              {CELEBRATION.heading}
            </h1>
            <p
              className="anim-copy mx-auto mt-3 max-w-[30ch] text-ink-soft"
              style={{ '--delay': '320ms' } as CSSProperties}
            >
              {CELEBRATION.body}
            </p>
            <p
              className="anim-copy mt-2 text-[1.35rem] text-ink"
              style={{ '--delay': '620ms' } as CSSProperties}
            >
              {CELEBRATION.closing}
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onReplay}
            className="min-h-11 rounded-[3px] border border-ink-soft px-5 py-2 text-ink-soft"
          >
            {CELEBRATION.replayLabel}
          </button>
        </div>
      </Shell>
    </>
  )
}
