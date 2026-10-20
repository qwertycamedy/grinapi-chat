import type { Method } from 'axios'

export interface GreenApiCredentials {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
}

export interface GreenApiRequest {
  apiMethod: string
  httpMethod?: Method
  pathParam?: string | number
  data?: unknown
  params?: Record<string, unknown>
  timeout?: number
  credentials?: GreenApiCredentials
}

export interface GreenApiError {
  status: number | 'NETWORK_ERROR' | 'TIMEOUT_ERROR' | 'NO_CREDENTIALS'
  message: string
}
