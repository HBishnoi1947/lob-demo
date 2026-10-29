import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** True when the viewer has asked their device for less animation. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const query = window.matchMedia(QUERY)
    const sync = () => setReduced(query.matches)
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return reduced
}
