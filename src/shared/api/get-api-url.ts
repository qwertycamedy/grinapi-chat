import { DEFAULT_API_URL } from '@/shared/config'

export function getApiUrlByInstanceId(idInstance: string) {
  const host = idInstance.slice(0, 4)

  return /^\d{4}$/.test(host) ? `https://${host}.api.green-api.com` : DEFAULT_API_URL
}
