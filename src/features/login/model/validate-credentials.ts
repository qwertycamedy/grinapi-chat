import type { GreenApiCredentials } from '@/shared/api'

export type CredentialsErrors = Partial<Record<keyof GreenApiCredentials, string>>

export function validateCredentials({ apiUrl, idInstance, apiTokenInstance }: GreenApiCredentials) {
  const errors: CredentialsErrors = {}

  if (!/^\d+$/.test(idInstance)) errors.idInstance = 'idInstance должен состоять из цифр'
  if (!apiTokenInstance) errors.apiTokenInstance = 'Укажите apiTokenInstance'
  if (!URL.canParse(apiUrl)) errors.apiUrl = 'Укажите корректный адрес API'

  return errors
}
