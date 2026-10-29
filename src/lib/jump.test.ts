import { expect, test } from 'vitest'
import { boundsOf, centreOf, clamp, pickSpot, type Bounds } from '@/lib/jump'

const AREA: Bounds = { maxLeft: 260, maxTop: 110 }

test('a spot always lands inside the area, over many draws', () => {
  let from = centreOf(AREA)

  for (let draw = 0; draw < 500; draw += 1) {
    from = pickSpot(AREA, from)
    expect(from.left).toBeGreaterThanOrEqual(0)
    expect(from.left).toBeLessThanOrEqual(AREA.maxLeft)
    expect(from.top).toBeGreaterThanOrEqual(0)
    expect(from.top).toBeLessThanOrEqual(AREA.maxTop)
  }
})

test('the button travels far enough to read as a jump', () => {
  const from = centreOf(AREA)
  const minTravel = AREA.maxLeft * 0.45

  // Every draw either clears the travel bar or is the furthest of ten tries,
  // so an imperceptible nudge should be rare. Sample to confirm.
  const travels = Array.from({ length: 200 }, () => {
    const to = pickSpot(AREA, from)
    return Math.hypot(to.left - from.left, to.top - from.top)
  })

  const tiny = travels.filter(distance => distance < 20).length
  expect(tiny).toBeLessThan(10)
  expect(Math.max(...travels)).toBeGreaterThan(minTravel)
})

test('a zero-size area cannot push the button outside itself', () => {
  const spot = pickSpot({ maxLeft: 0, maxTop: 0 }, { left: 0, top: 0 })
  expect(spot).toEqual({ left: 0, top: 0 })
})

test('a button wider than its area is pinned rather than given negative room', () => {
  const button = { offsetWidth: 400 } as HTMLElement
  const area = { clientWidth: 300, clientHeight: 160 } as HTMLElement
  Object.defineProperty(button, 'offsetHeight', { value: 48 })

  expect(boundsOf(button, area)).toEqual({ maxLeft: 0, maxTop: 112 })
})

test('rotating to a narrower screen pulls the button back into view', () => {
  const stranded = { left: 240, top: 100 }
  expect(clamp(stranded, { maxLeft: 120, maxTop: 60 })).toEqual({ left: 120, top: 60 })
})
