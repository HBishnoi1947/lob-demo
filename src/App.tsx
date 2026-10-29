import { useState } from 'react'
import { AskScreen } from '@/components/AskScreen'
import { Celebration } from '@/components/Celebration'
import { ASK_SCREENS } from '@/content/screens'

/**
 * Three screens in a line: sorry, then the second-date question, then the
 * celebration. Each ask screen remounts on its own key so its tap count and
 * the no button's position start fresh.
 */
export function App() {
  const [step, setStep] = useState(0)

  const content = ASK_SCREENS[step]

  if (!content) {
    return <Celebration onReplay={() => setStep(0)} />
  }

  return (
    <AskScreen key={content.id} content={content} onAccept={() => setStep(step + 1)} />
  )
}
