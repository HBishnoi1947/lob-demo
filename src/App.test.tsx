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

const no = () => screen.getByRole('button', { name: /no|really|please/i })
const heading = () => screen.getByRole('heading').textContent
const okay = (name: RegExp) => screen.queryByRole('button', { name })

test('the apology opens with Shruti named and no way forward but the no button', () => {
  render(<App />)

  expect(heading()).toBe('Shruti, I am so sorry.')
  expect(no().textContent).toBe('No')
  expect(okay(/it's okay/i)).toBeNull()
})

test('two taps on no reveal the okay button, which leads to the date question', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(no())
  expect(okay(/it's okay/i)).toBeNull()
  expect(no().textContent).toContain('Really?')

  await user.click(no())
  await user.click(screen.getByRole('button', { name: /it's okay/i }))

  expect(heading()).toBe('One more chance?')
  expect(okay(/let's go/i)).toBeNull()
})

test('the no button keeps its label and stays reachable after each tap', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(no())
  expect(no().isConnected).toBe(true)
  expect(parseFloat(no().style.fontSize)).toBeLessThan(1.0625)

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
  await user.click(screen.getByRole('button', { name: /let's go/i }))

  expect(heading()).toBe("It's a date, Shruti!")
})

test('the okay button is announced when it appears', async () => {
  const user = userEvent.setup()
  const { container } = render(<App />)
  const live = () => container.querySelector('[aria-live="polite"]')?.textContent

  expect(live()).toBe('')

  await user.click(no())
  await user.click(no())

  expect(live()).toMatch(/it's okay button is here now/i)
})
