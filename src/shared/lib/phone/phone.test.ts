import { formatPhone, isValidPhone, normalizePhone } from './phone'

describe('normalizePhone', () => {
  it('removes everything except digits', () => {
    expect(normalizePhone('+7 (999) 123-45-67')).toBe('79991234567')
  })

  it('replaces russian leading 8 with 7', () => {
    expect(normalizePhone('8 999 123 45 67')).toBe('79991234567')
  })

  it('keeps other international numbers as is', () => {
    expect(normalizePhone('+375 29 123-45-67')).toBe('375291234567')
  })
})

describe('isValidPhone', () => {
  it.each(['+7 999 123-45-67', '8 708 981 39 66', '+375291234567', '+4915123456789'])(
    'accepts %s',
    (phone) => {
      expect(isValidPhone(phone)).toBe(true)
    },
  )

  it.each(['', '123', '+0 999 123 45 67', '1234567890123456'])('rejects %s', (phone) => {
    expect(isValidPhone(phone)).toBe(false)
  })
})

describe('formatPhone', () => {
  it('formats russian and kazakh numbers', () => {
    expect(formatPhone('79991234567')).toBe('+7 999 123-45-67')
  })

  it('adds plus to other numbers', () => {
    expect(formatPhone('375291234567')).toBe('+375291234567')
  })

  it('returns empty string for empty value', () => {
    expect(formatPhone('')).toBe('')
  })
})
