import { useEffect, useMemo, useRef, useState } from 'react'
import { CELEBRATION } from '@/content/screens'
import { makeDateCode } from '@/lib/code'

type CopyState = 'idle' | 'copied' | 'manual'

const REVERT_AFTER = 2600

type Props = {
  /** The moment she said yes. */
  when: Date
}

/**
 * A ticket stub bearing the code she can only get by finishing. The copy
 * button is the main action on this screen; if the clipboard is unavailable
 * the code gets selected instead, so she can copy it by hand.
 */
export function DateCode({ when }: Props) {
  const code = useMemo(() => makeDateCode(when), [when])
  const [state, setState] = useState<CopyState>('idle')
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (state === 'idle') return
    const timer = window.setTimeout(() => setState('idle'), REVERT_AFTER)
    return () => window.clearTimeout(timer)
  }, [state])

  function selectCode() {
    const node = codeRef.current
    const selection = window.getSelection()
    if (!node || !selection) return
    const range = document.createRange()
    range.selectNodeContents(node)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setState('copied')
    } catch {
      selectCode()
      setState('manual')
    }
  }

  const label =
    state === 'copied'
      ? CELEBRATION.copiedLabel
      : state === 'manual'
        ? CELEBRATION.manualLabel
        : CELEBRATION.copyLabel

  return (
    <div className="mx-auto w-full max-w-[20rem]">
      <div className="border border-rule bg-plate">
        <div className="px-5 pt-4 pb-5 text-center">
          <p className="text-sm tracking-[0.18em] text-gilt uppercase">
            {CELEBRATION.ticketLine}
          </p>

          <code
            ref={codeRef}
            className="mt-3 block font-serif text-[clamp(1.1rem,5.6vw,1.45rem)] tracking-[0.1em] text-ink tabular-nums"
          >
            {code}
          </code>
        </div>

        {/* The stub's perforation. */}
        <div className="border-t border-dashed border-rule p-3">
          <button
            type="button"
            onClick={copy}
            className="w-full rounded-[3px] bg-oxblood px-5 py-3 text-lg text-paper transition-colors active:bg-oxblood-deep"
          >
            {label}
          </button>
        </div>
      </div>

      <p className="mt-4 text-ink-soft">{CELEBRATION.instruction}</p>

      <p aria-live="polite" className="sr-only">
        {state === 'copied' ? CELEBRATION.copiedAnnouncement : ''}
        {state === 'manual' ? CELEBRATION.manualAnnouncement : ''}
      </p>
    </div>
  )
}
