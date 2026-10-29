import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { JumpyNoButton } from '@/components/JumpyNoButton'
import { Plate } from '@/components/Plate'
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
      <div className="flex flex-1 flex-col justify-center gap-8 text-center">
        <Plate illustration={content.illustration} />

        <div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="anim-copy text-[clamp(2rem,8.5vw,2.75rem)]"
            style={{ '--delay': '180ms' } as CSSProperties}
          >
            {content.heading}
          </h1>
          <p
            className="anim-copy mx-auto mt-3 max-w-[30ch] text-ink-soft"
            style={{ '--delay': '320ms' } as CSSProperties}
          >
            {content.body}
          </p>
        </div>
      </div>

      {/* The no button roams inside this box and nowhere else, so it can
          never leave the screen or cover the okay button. */}
      <div ref={playAreaRef} className="relative h-36">
        <JumpyNoButton
          labels={content.noLabels}
          taps={taps}
          areaRef={playAreaRef}
          onTap={() => setTaps(count => count + 1)}
        />
      </div>

      <div className="min-h-[4.5rem]">
        {unlocked && (
          <button
            type="button"
            onClick={onAccept}
            className="anim-okay w-full rounded-[3px] bg-oxblood px-6 py-3.5 text-xl text-paper transition-colors active:bg-oxblood-deep"
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
