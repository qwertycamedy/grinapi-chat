const INTERNATIONAL_PHONE_PATTERN = /^[1-9]\d{9,14}$/
const RUSSIAN_PHONE_PATTERN = /^7\d{10}$/

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 11 && digits.startsWith('8')) return `7${digits.slice(1)}`

  return digits
}

export function isValidPhone(value: string) {
  return INTERNATIONAL_PHONE_PATTERN.test(normalizePhone(value))
}

export function formatPhone(value: string) {
  const phone = normalizePhone(value)

  if (RUSSIAN_PHONE_PATTERN.test(phone)) {
    return `+7 ${phone.slice(1, 4)} ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`
  }

  return phone ? `+${phone}` : ''
}
