import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { EmojiScene } from '@/components/EmojiScene'
import { JumpyNoButton } from '@/components/JumpyNoButton'
import { Shell } from '@/components/Shell'
import type { AskContent } from '@/content/screens'

/** Taps on no before the okay button turns up. */
const TAPS_TO_UNLOCK = 2

type Props = {
  content: AskContent
  onAccept: () => void
}

export function AskScreen({ content, onAccept }: Props) {
  const [taps, setTaps] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const playAreaRef = useRef<HTMLDivElement>(null)
  const unlocked = taps >= TAPS_TO_UNLOCK

  useEffect(() => {
    document.title = content.docTitle
    headingRef.current?.focus()
  }, [content.docTitle])

  return (
    <Shell>
      <div className="flex flex-1 flex-col justify-center gap-7 pb-2">
        <EmojiScene scene={content.scene} />

        <div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="anim-copy text-[clamp(2rem,8.5vw,2.6rem)]"
            style={{ '--delay': '160ms' } as CSSProperties}
          >
            {content.heading}
          </h1>
          <p
            lang="hi"
            className="anim-copy mt-1 font-display text-xl text-marigold"
            style={{ '--delay': '280ms' } as CSSProperties}
          >
            {content.aside}
          </p>
          <p
            className="anim-copy mt-3 max-w-[32ch] text-cream-dim"
            style={{ '--delay': '380ms' } as CSSProperties}
          >
            {content.body}
          </p>
        </div>
      </div>

      {/* The no button roams inside this box and nowhere else, so it can
          never leave the screen or cover the okay button. */}
      <div
        ref={playAreaRef}
        className="relative h-40 rounded-3xl border border-dashed border-ink-line/60"
      >
        <JumpyNoButton
          labels={content.noLabels}
          taps={taps}
          areaRef={playAreaRef}
          onTap={() => setTaps(count => count + 1)}
        />
      </div>

      <div className="min-h-[4.75rem] pt-3">
        {unlocked && (
          <button
            type="button"
            onClick={onAccept}
            className="anim-okay w-full rounded-full bg-marigold px-6 py-4 font-display text-xl font-bold text-ink shadow-[0_8px_0_0_var(--color-marigold-deep)] active:translate-y-[3px] active:shadow-[0_5px_0_0_var(--color-marigold-deep)]"
          >
            {content.okayLabel}
          </button>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {unlocked ? content.arrival : ''}
      </p>
    </Shell>
  )
}
