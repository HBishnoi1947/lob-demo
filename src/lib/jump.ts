export type Spot = { left: number; top: number }

/** How far the button may travel, in pixels, measured from its top-left. */
export type Bounds = { maxLeft: number; maxTop: number }

/** The room a button has inside its play area, never negative. */
export function boundsOf(button: HTMLElement, area: HTMLElement): Bounds {
  return {
    maxLeft: Math.max(0, area.clientWidth - button.offsetWidth),
    maxTop: Math.max(0, area.clientHeight - button.offsetHeight),
  }
}

/** Pulls a spot back inside the area, for when the phone rotates. */
export function clamp(spot: Spot, bounds: Bounds): Spot {
  return {
    left: Math.min(Math.max(0, spot.left), bounds.maxLeft),
    top: Math.min(Math.max(0, spot.top), bounds.maxTop),
  }
}

export function centreOf(bounds: Bounds): Spot {
  return { left: bounds.maxLeft / 2, top: bounds.maxTop / 2 }
}

const ATTEMPTS = 10
const TRAVEL_RATIO = 0.45

/**
 * Picks a fresh spot inside the play area, preferring somewhere far enough
 * from the current one that the jump actually reads as a jump. Falls back to
 * the furthest candidate it saw, so a cramped area still moves the button.
 */
export function pickSpot(bounds: Bounds, from: Spot, random: () => number = Math.random): Spot {
  const minTravel = Math.max(bounds.maxLeft, bounds.maxTop) * TRAVEL_RATIO

  let best = from
  let bestTravel = -1

  for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
    const candidate = {
      left: random() * bounds.maxLeft,
      top: random() * bounds.maxTop,
    }
    const travel = Math.hypot(candidate.left - from.left, candidate.top - from.top)
    if (travel > minTravel) return candidate
    if (travel > bestTravel) {
      bestTravel = travel
      best = candidate
    }
  }

  return best
}
