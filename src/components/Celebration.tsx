import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import { EmojiScene } from '@/components/EmojiScene'
import { Shell } from '@/components/Shell'
import { CELEBRATION, CONFETTI } from '@/content/screens'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PIECE_COUNT = 18

type Piece = {
  emoji: string
  left: number
  delay: number
  duration: number
  spin: number
}

function makeConfetti(): Piece[] {
  return Array.from({ length: PIECE_COUNT }, (_, index) => ({
    emoji: CONFETTI[index % CONFETTI.length],
    left: Math.random() * 92,
    delay: Math.random() * 1600,
    duration: 2400 + Math.random() * 1800,
    spin: 220 + Math.random() * 420,
  }))
}

type Props = {
  onReplay: () => void
}

export function Celebration({ onReplay }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const reducedMotion = useReducedMotion()
  const confetti = useMemo(() => (reducedMotion ? [] : makeConfetti()), [reducedMotion])

  useEffect(() => {
    document.title = CELEBRATION.docTitle
    headingRef.current?.focus()
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {confetti.map((piece, index) => (
          <span
            key={index}
            className="anim-confetti absolute top-0 text-2xl"
            style={
              {
                left: `${piece.left}%`,
                '--delay': `${piece.delay}ms`,
                '--dur': `${piece.duration}ms`,
                '--spin': `${piece.spin}deg`,
              } as CSSProperties
            }
          >
            {piece.emoji}
          </span>
        ))}
      </div>

      <Shell>
        <div className="flex flex-1 flex-col justify-center gap-7">
          <EmojiScene scene={CELEBRATION.scene} />

          <div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="anim-copy text-[clamp(2rem,8.5vw,2.6rem)]"
              style={{ '--delay': '160ms' } as CSSProperties}
            >
              {CELEBRATION.heading}
            </h1>
            <p
              lang="hi"
              className="anim-copy mt-1 font-display text-xl text-marigold"
              style={{ '--delay': '280ms' } as CSSProperties}
            >
              {CELEBRATION.aside}
            </p>
            <p
              className="anim-copy mt-3 max-w-[32ch] text-cream-dim"
              style={{ '--delay': '380ms' } as CSSProperties}
            >
              {CELEBRATION.body}
            </p>
          </div>
        </div>

        <div className="pt-3">
          <button
            type="button"
            onClick={onReplay}
            className="min-h-11 rounded-full border-2 border-ink-edge px-5 py-2 font-semibold text-cream-dim"
          >
            {CELEBRATION.replayLabel}
          </button>
        </div>
      </Shell>
    </>
  )
}
