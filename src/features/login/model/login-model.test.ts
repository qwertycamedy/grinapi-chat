import { getInstanceStateError } from './get-instance-state-error'
import { validateCredentials } from './validate-credentials'

describe('validateCredentials', () => {
  it('returns no errors for valid credentials', () => {
    expect(
      validateCredentials({ apiUrl: 'https://1101.api.green-api.com', idInstance: '1101', apiTokenInstance: 't' }),
    ).toEqual({})
  })

  it('returns error for every invalid field', () => {
    expect(validateCredentials({ apiUrl: 'not url', idInstance: '11a', apiTokenInstance: '' })).toEqual({
      apiUrl: 'Укажите корректный адрес API',
      idInstance: 'idInstance должен состоять из цифр',
      apiTokenInstance: 'Укажите apiTokenInstance',
    })
  })
})

describe('getInstanceStateError', () => {
  it('returns null for authorized instance', () => {
    expect(getInstanceStateError('authorized')).toBeNull()
  })

  it('explains not authorized instance', () => {
    expect(getInstanceStateError('notAuthorized')).toMatch(/не авторизован/)
  })
})
