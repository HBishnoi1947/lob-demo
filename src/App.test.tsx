import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeAll, expect, test } from 'vitest'
import { App } from '@/App'

beforeAll(() => {
  // jsdom ships neither of these, and the app reads both on mount.
  window.matchMedia ??= (query: string) =>
    ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }) as unknown as MediaQueryList

  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

afterEach(cleanup)

const no = () =>
  screen.getByRole('button', { name: /^(no|please|pretty please|last time|please\.\.\.)$/i })
const heading = () => screen.getByRole('heading').textContent
const okay = (name: RegExp) => screen.queryByRole('button', { name })

test('the apology opens with Manvi named and no way forward but the no button', () => {
  render(<App />)

  expect(heading()).toBe("Manvi, I'm sorry.")
  expect(no().textContent).toBe('No')
  expect(okay(/it's okay/i)).toBeNull()
})

test('two taps on no reveal the okay button, which leads to the date question', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(no())
  expect(okay(/it's okay/i)).toBeNull()
  expect(no().textContent).toBe('please')

  await user.click(no())
  await user.click(screen.getByRole('button', { name: /it's okay/i }))

  expect(heading()).toBe('One more chance?')
  expect(okay(/yes, let's go/i)).toBeNull()
})

test('the no button pleads harder with every tap, then settles on its last line', async () => {
  const user = userEvent.setup()
  render(<App />)

  const said: string[] = [no().textContent ?? '']
  for (let tap = 0; tap < 5; tap += 1) {
    await user.click(no())
    said.push(no().textContent ?? '')
  }

  expect(said).toEqual([
    'No',
    'please',
    'pretty please',
    'last time',
    'please...',
    // It runs out of things to say and stays there.
    'please...',
  ])
})

test('the no button keeps its label and stays reachable after each tap', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(no())
  expect(no().isConnected).toBe(true)
  expect(parseFloat(no().style.fontSize)).toBeLessThan(1.125)

  await user.click(no())
  // Still in the document, so she can keep tapping it if she wants to.
  expect(no().isConnected).toBe(true)
})

test('the second-date question follows the same pattern and ends in the celebration', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(no())
  await user.click(no())
  await user.click(screen.getByRole('button', { name: /it's okay/i }))

  await user.click(no())
  await user.click(no())
  await user.click(screen.getByRole('button', { name: /yes, let's go/i }))

  expect(heading()).toBe("It's a date...")
  expect(screen.getByText('Waffle it is.')).toBeTruthy()
})

test('each screen shows one illustration with a real description', async () => {
  const user = userEvent.setup()
  render(<App />)

  const described = () => {
    const image = screen.getByRole('img')
    return image.getAttribute('alt') ?? ''
  }

  expect(described()).toMatch(/bears/i)

  await user.click(no())
  await user.click(no())
  await user.click(screen.getByRole('button', { name: /it's okay/i }))
  expect(described()).toMatch(/carrying a girl/i)

  await user.click(no())
  await user.click(no())
  await user.click(screen.getByRole('button', { name: /yes, let's go/i }))
  expect(described()).toMatch(/close hug/i)
})

test('the okay button is announced when it appears', async () => {
  const user = userEvent.setup()
  const { container } = render(<App />)
  const live = () => container.querySelector('[aria-live="polite"]')?.textContent

  expect(live()).toBe('')

  await user.click(no())
  await user.click(no())

  expect(live()).toMatch(/it's okay button has appeared/i)
})

async function reachTheEnd(user: ReturnType<typeof userEvent.setup>) {
  await user.click(no())
  await user.click(no())
  await user.click(screen.getByRole('button', { name: /it's okay/i }))
  await user.click(no())
  await user.click(no())
  await user.click(screen.getByRole('button', { name: /yes, let's go/i }))
}

test('the last screen issues a code stamped with the day and minute', async () => {
  const user = userEvent.setup()
  render(<App />)
  await reachTheEnd(user)

  const code = screen.getByText(/^WAFFLE-/)
  expect(code.textContent).toMatch(/^WAFFLE-\d{2}[A-Z]{3}-\d{4}$/)
})

test('the copy button puts the code on the clipboard and says so', async () => {
  const user = userEvent.setup()
  render(<App />)
  await reachTheEnd(user)

  const code = screen.getByText(/^WAFFLE-/).textContent
  await user.click(screen.getByRole('button', { name: /copy the code/i }))

  expect(await navigator.clipboard.readText()).toBe(code)
  expect(screen.getByRole('button', { name: /copied/i })).toBeTruthy()
})

test('she is told where to send it', async () => {
  const user = userEvent.setup()
  render(<App />)
  await reachTheEnd(user)

  expect(screen.getByText(/send this to me on whatsapp/i)).toBeTruthy()
})
