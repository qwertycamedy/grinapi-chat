import { http, HttpResponse } from 'msw'
import { getTestUrl, TEST_CREDENTIALS } from '@tests/fixtures'
import { apiErrorResponse, apiResponse } from '@tests/responses'
import { server } from '@tests/server'
import { axiosBaseQuery } from './axios-base-query'

function runQuery(args: Parameters<typeof axiosBaseQuery>[0], credentials = TEST_CREDENTIALS) {
  const api = {
    getState: () => ({ session: { credentials } }),
    signal: new AbortController().signal,
  } as unknown as Parameters<typeof axiosBaseQuery>[1]

  return axiosBaseQuery(args, api, {})
}

describe('axiosBaseQuery', () => {
  it('returns response data using credentials from state', async () => {
    const result = await runQuery({ apiMethod: 'getStateInstance' })

    expect(result).toEqual({ data: { stateInstance: 'authorized' } })
  })

  it('sends request body', async () => {
    let requestBody: unknown
    server.use(
      http.post(getTestUrl('sendMessage'), async ({ request }) => {
        requestBody = await request.json()
        return apiResponse({ idMessage: '1' })
      }),
    )

    const result = await runQuery({
      apiMethod: 'sendMessage',
      httpMethod: 'POST',
      data: { chatId: '1', message: 'hi' },
    })

    expect(result).toEqual({ data: { idMessage: '1' } })
    expect(requestBody).toEqual({ chatId: '1', message: 'hi' })
  })

  it('returns http status on error response', async () => {
    server.use(http.get(getTestUrl('getStateInstance'), () => apiErrorResponse(401)))

    const result = await runQuery({ apiMethod: 'getStateInstance' })

    expect(result.error?.status).toBe(401)
  })

  it('returns network error when server is unreachable', async () => {
    server.use(http.get(getTestUrl('getStateInstance'), () => HttpResponse.error()))

    const result = await runQuery({ apiMethod: 'getStateInstance' })

    expect(result.error?.status).toBe('NETWORK_ERROR')
  })

  it('returns error without credentials', async () => {
    const result = await runQuery({ apiMethod: 'getStateInstance' }, null as never)

    expect(result.error?.status).toBe('NO_CREDENTIALS')
  })
})
