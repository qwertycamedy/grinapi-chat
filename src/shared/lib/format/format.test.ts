import { formatChatTime, formatMessageTime } from './date'
import { getInitials } from './initials'

describe('getInitials', () => {
  it('takes first letters of two first words', () => {
    expect(getInitials('иван петров сидорович')).toBe('ИП')
  })

  it('ignores words without letters', () => {
    expect(getInitials('+7 999 123-45-67')).toBe('#')
  })

  it('returns hash for empty name', () => {
    expect(getInitials('   ')).toBe('#')
  })
})

describe('formatChatTime', () => {
  const now = new Date(2026, 9, 20, 18, 0).getTime()

  it('shows time for today', () => {
    const today = new Date(2026, 9, 20, 9, 5).getTime()

    expect(formatChatTime(today, now)).toBe(formatMessageTime(today))
  })

  it('shows date for previous days', () => {
    const yesterday = new Date(2026, 9, 19, 9, 5).getTime()

    expect(formatChatTime(yesterday, now)).toMatch(/19/)
  })
})
