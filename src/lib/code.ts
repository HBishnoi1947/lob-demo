const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
] as const

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/**
 * The code she can only see by reaching the last screen, stamped with the
 * moment she got there: WAFFLE-29OCT-2241.
 */
export function makeDateCode(when: Date): string {
  const day = pad(when.getDate())
  const month = MONTHS[when.getMonth()]
  const time = `${pad(when.getHours())}${pad(when.getMinutes())}`
  return `WAFFLE-${day}${month}-${time}`
}
