import { expect, test } from 'vitest'
import { makeDateCode } from '@/lib/code'

test('the code carries the day and the minute she got here', () => {
  expect(makeDateCode(new Date(2026, 9, 29, 22, 41))).toBe('WAFFLE-29OCT-2241')
})

test('single digits are padded, so every code is the same width', () => {
  expect(makeDateCode(new Date(2026, 0, 5, 9, 7))).toBe('WAFFLE-05JAN-0907')
})

test('midnight reads as 0000 rather than 2400 or 1200', () => {
  expect(makeDateCode(new Date(2026, 11, 31, 0, 0))).toBe('WAFFLE-31DEC-0000')
})

test('every month has a three-letter name', () => {
  const names = Array.from({ length: 12 }, (_, month) =>
    makeDateCode(new Date(2026, month, 1, 0, 0)).split('-')[1].slice(2),
  )
  expect(names).toEqual([
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  ])
})
