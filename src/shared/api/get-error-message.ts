import type { GreenApiError } from './types'

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Некорректный запрос',
  401: 'Неверный idInstance или apiTokenInstance',
  403: 'Неверный idInstance или apiTokenInstance',
  404: 'Инстанс не найден, проверьте apiUrl и idInstance',
  429: 'Слишком много запросов, попробуйте позже',
  466: 'Превышен лимит тарифа GREEN-API',
  469: 'Превышен лимит проверки номеров, попробуйте позже',
}

export function isGreenApiError(error: unknown): error is GreenApiError {
  return typeof error === 'object' && error !== null && 'status' in error && 'message' in error
}

export function isUnauthorizedError(error: unknown) {
  return isGreenApiError(error) && (error.status === 401 || error.status === 403)
}

export function getErrorMessage(error: unknown) {
  if (!isGreenApiError(error)) return 'Неизвестная ошибка'
  if (error.status === 'NETWORK_ERROR') return 'Нет соединения с сервером GREEN-API, проверьте интернет и apiUrl'
  if (error.status === 'TIMEOUT_ERROR') return 'Сервер GREEN-API не ответил вовремя, проверьте apiUrl'
  if (error.status === 'NO_CREDENTIALS') return error.message
  if (error.status >= 500) return 'Сервер GREEN-API временно недоступен'

  return ERROR_MESSAGES[error.status] ?? `Ошибка GREEN-API (${error.status})`
}
