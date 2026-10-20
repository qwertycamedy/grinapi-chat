import type { GreenApiCredentials } from './types'

export function buildGreenApiUrl(
  { apiUrl, idInstance, apiTokenInstance }: GreenApiCredentials,
  apiMethod: string,
  pathParam?: string | number,
) {
  const baseUrl = apiUrl.replace(/\/+$/, '')
  const url = `${baseUrl}/waInstance${idInstance}/${apiMethod}/${apiTokenInstance}`

  return pathParam === undefined ? url : `${url}/${pathParam}`
}
