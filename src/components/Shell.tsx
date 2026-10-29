import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

/**
 * One phone-shaped column. Scrolling stays available for anyone who zooms in,
 * and the padding keeps clear of notches and home bars.
 */
export function Shell({ children }: Props) {
  return (
    <main
      className="mx-auto flex w-full max-w-md flex-col px-6"
      style={{
        minHeight: '100dvh',
        paddingTop: 'max(1.75rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))',
      }}
    >
      {children}
    </main>
  )
}
