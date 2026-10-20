import { delay, http } from 'msw'
import { setupServer } from 'msw/node'
import { getTestUrl, TEST_CHAT_ID } from './fixtures'
import { apiResponse, preflightResponse } from './responses'

export const handlers = [
  http.options('*', () => preflightResponse()),
  http.get(getTestUrl('getStateInstance'), () => apiResponse({ stateInstance: 'authorized' })),
  http.get(getTestUrl('getSettings'), () =>
    apiResponse({
      wid: '77000000000@c.us',
      webhookUrl: '',
      incomingWebhook: 'yes',
      outgoingWebhook: 'no',
    }),
  ),
  http.post(getTestUrl('setSettings'), () => apiResponse({ saveSettings: true })),
  http.post(getTestUrl('checkAccount'), () =>
    apiResponse({ exist: true, chatId: TEST_CHAT_ID, username: '@ivan' }),
  ),
  http.post(getTestUrl('sendMessage'), () => apiResponse({ idMessage: 'sent-1' })),
  http.get(getTestUrl('receiveNotification'), async () => {
    await delay('infinite')
    return apiResponse(null)
  }),
  http.delete(`${getTestUrl('deleteNotification')}/:receiptId`, () => apiResponse({ result: true })),
]

export const server = setupServer(...handlers)
