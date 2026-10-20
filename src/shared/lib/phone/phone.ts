const RUSSIAN_PHONE_PATTERN = /^7\d{10}$/
const BELARUSIAN_PHONE_PATTERN = /^375\d{9}$/

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 11 && digits.startsWith('8')) return `7${digits.slice(1)}`

  return digits
}

export function isValidPhone(value: string) {
  const phone = normalizePhone(value)

  return RUSSIAN_PHONE_PATTERN.test(phone) || BELARUSIAN_PHONE_PATTERN.test(phone)
}

export function formatPhone(value: string) {
  const phone = normalizePhone(value)

  if (RUSSIAN_PHONE_PATTERN.test(phone)) {
    return `+7 ${phone.slice(1, 4)} ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`
  }

  if (BELARUSIAN_PHONE_PATTERN.test(phone)) {
    return `+375 ${phone.slice(3, 5)} ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10)}`
  }

  return phone ? `+${phone}` : ''
}
