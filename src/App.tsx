import { useState } from 'react'
import { AskScreen } from '@/components/AskScreen'
import { Celebration } from '@/components/Celebration'
import { ASK_SCREENS } from '@/content/screens'

type Stage =
  | { name: 'asking'; index: number }
  /** `at` is the moment she said yes, which the ticket code is stamped with. */
  | { name: 'done'; at: Date }

const START: Stage = { name: 'asking', index: 0 }

/**
 * Three screens in a line: sorry, then the second-date question, then the
 * celebration. Each ask screen remounts on its own key so its tap count and
 * the no button's position start fresh.
 */
export function App() {
  const [stage, setStage] = useState<Stage>(START)

  if (stage.name === 'done') {
    return <Celebration finishedAt={stage.at} onReplay={() => setStage(START)} />
  }

  const content = ASK_SCREENS[stage.index]
  if (!content) return null

  const isLast = stage.index + 1 >= ASK_SCREENS.length

  return (
    <AskScreen
      key={content.id}
      content={content}
      onAccept={() =>
        setStage(isLast ? { name: 'done', at: new Date() } : { name: 'asking', index: stage.index + 1 })
      }
    />
  )
}
