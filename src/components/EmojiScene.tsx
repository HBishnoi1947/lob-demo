import type { CSSProperties } from 'react'
import type { Scene } from '@/content/screens'

const HEARTS = [
  { emoji: '💕', left: '14%', delay: '0ms' },
  { emoji: '💗', left: '48%', delay: '900ms' },
  { emoji: '💓', left: '78%', delay: '1800ms' },
]

type Props = {
  scene: Scene
}

/** The two of us, drawn in emoji, at the size of a phone screen. */
export function EmojiScene({ scene }: Props) {
  return (
    <div className="anim-scene relative mx-auto w-full">
      <div className="pointer-events-none absolute inset-x-0 bottom-6 h-20" aria-hidden="true">
        {HEARTS.map(heart => (
          <span
            key={heart.emoji}
            className="anim-heart absolute bottom-0 text-xl"
            style={{ left: heart.left, '--delay': heart.delay } as CSSProperties}
          >
            {heart.emoji}
          </span>
        ))}
      </div>

      <div
        role="img"
        aria-label={scene.description}
        className="relative flex items-end justify-center text-[clamp(3.25rem,18vw,5rem)] leading-none"
      >
        <span aria-hidden="true" className="anim-her">
          {scene.her}
        </span>
        <span aria-hidden="true" className="anim-prop -mb-1 -mx-2 text-[0.58em]">
          {scene.prop}
        </span>
        <span aria-hidden="true" className="anim-him">
          {scene.him}
        </span>
      </div>
    </div>
  )
}
