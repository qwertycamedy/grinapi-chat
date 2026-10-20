import { buildGreenApiUrl } from './build-green-api-url'
import { getApiUrlByInstanceId } from './get-api-url'
import { getErrorMessage, isUnauthorizedError } from './get-error-message'

const credentials = {
  apiUrl: 'https://1101.api.green-api.com/',
  idInstance: '1101000001',
  apiTokenInstance: 'token',
}

describe('buildGreenApiUrl', () => {
  it('builds method url without trailing slash duplication', () => {
    expect(buildGreenApiUrl(credentials, 'sendMessage')).toBe(
      'https://1101.api.green-api.com/waInstance1101000001/sendMessage/token',
    )
  })

  it('appends path param', () => {
    expect(buildGreenApiUrl(credentials, 'deleteNotification', 42)).toBe(
      'https://1101.api.green-api.com/waInstance1101000001/deleteNotification/token/42',
    )
  })
})

describe('getApiUrlByInstanceId', () => {
  it('uses first four digits of idInstance as host', () => {
    expect(getApiUrlByInstanceId('410022775073')).toBe('https://4100.api.green-api.com')
  })

  it('falls back to default api url for short id', () => {
    expect(getApiUrlByInstanceId('41')).toBe('https://api.green-api.com')
  })
})

describe('getErrorMessage', () => {
  it.each([
    [{ status: 401, message: '' }, 'Неверный idInstance или apiTokenInstance'],
    [{ status: 466, message: '' }, 'Превышен лимит тарифа GREEN-API'],
    [{ status: 502, message: '' }, 'Сервер GREEN-API временно недоступен'],
    [{ status: 418, message: '' }, 'Ошибка GREEN-API (418)'],
    [{ status: 'TIMEOUT_ERROR', message: '' }, 'Сервер GREEN-API не ответил вовремя, проверьте apiUrl'],
    [new Error('boom'), 'Неизвестная ошибка'],
  ])('maps %o', (error, message) => {
    expect(getErrorMessage(error)).toBe(message)
  })
})

describe('isUnauthorizedError', () => {
  it('detects 401 and 403 statuses', () => {
    expect(isUnauthorizedError({ status: 401, message: '' })).toBe(true)
    expect(isUnauthorizedError({ status: 403, message: '' })).toBe(true)
    expect(isUnauthorizedError({ status: 500, message: '' })).toBe(false)
  })
})
