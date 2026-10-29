import type { CSSProperties, RefObject } from 'react'
import { useLayoutEffect, useRef, useState } from 'react'
import type { Spot } from '@/lib/jump'
import { boundsOf, centreOf, clamp, pickSpot } from '@/lib/jump'

/** Shrinks a little on every tap, but never below a 44px touch target. */
const SHRINK_PER_TAP = 0.12
const MIN_SCALE = 0.62

type Props = {
  labels: readonly string[]
  taps: number
  /** The box the button is allowed to roam inside. */
  areaRef: RefObject<HTMLElement | null>
  onTap: () => void
}

/**
 * The no button. It dodges on tap only — never on hover or focus, so it stays
 * usable with a keyboard, a screen reader, or a mouse that just passes over it.
 */
export function JumpyNoButton({ labels, taps, areaRef, onTap }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [spot, setSpot] = useState<Spot | null>(null)
  const [squishing, setSquishing] = useState(false)

  /**
   * Start centred in pixel terms rather than with a centring transform, so the
   * first jump travels from where the button looks like it is. Measured before
   * paint, and re-clamped if the phone rotates and the box gets narrower.
   */
  useLayoutEffect(() => {
    const button = buttonRef.current
    const area = areaRef.current
    if (!button || !area) return

    const settle = () => {
      const bounds = boundsOf(button, area)
      setSpot(current => (current ? clamp(current, bounds) : centreOf(bounds)))
    }

    settle()

    const observer = new ResizeObserver(settle)
    observer.observe(area)
    return () => observer.disconnect()
  }, [areaRef])

  function handleClick() {
    const button = buttonRef.current
    const area = areaRef.current
    if (button && area) {
      const bounds = boundsOf(button, area)
      setSpot(current => pickSpot(bounds, current ?? centreOf(bounds)))
    }
    setSquishing(true)
    onTap()
  }

  const label = labels[Math.min(taps, labels.length - 1)]
  const scale = Math.max(MIN_SCALE, 1 - taps * SHRINK_PER_TAP)

  const placement: { style: CSSProperties; className: string } = spot
    ? { style: { left: `${spot.left}px`, top: `${spot.top}px` }, className: '' }
    : { style: {}, className: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      onAnimationEnd={() => setSquishing(false)}
      className={`jump-ease absolute inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-ink-edge bg-ink-raised font-semibold text-cream-dim ${placement.className} ${squishing ? 'anim-squish' : ''}`}
      style={{
        ...placement.style,
        fontSize: `${(1.0625 * scale).toFixed(3)}rem`,
        paddingInline: `${(1.5 * scale).toFixed(3)}rem`,
        paddingBlock: `${(0.6 * scale).toFixed(3)}rem`,
      }}
    >
      {label}
    </button>
  )
}
