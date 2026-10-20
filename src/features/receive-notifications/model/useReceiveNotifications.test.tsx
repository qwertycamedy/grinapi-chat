import { renderHook, waitFor } from '@testing-library/react'
import { delay, http } from 'msw'
import { Provider } from 'react-redux'
import type { ReactNode } from 'react'
import { createIncomingMessage, getTestUrl, TEST_CHAT_ID } from '@tests/fixtures'
import { apiErrorResponse, apiResponse } from '@tests/responses'
import { server } from '@tests/server'
import { createTestStore } from '@tests/store'
import { createAuthorizedState } from '@tests/state'
import { useReceiveNotifications } from './useReceiveNotifications'

function renderReceiveNotifications(onUnauthorized = vi.fn()) {
  const store = createTestStore(createAuthorizedState())
  const wrapper = ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>
  const hook = renderHook(() => useReceiveNotifications({ onUnauthorized }), { wrapper })

  return { store, onUnauthorized, ...hook }
}

describe('useReceiveNotifications', () => {
  it('adds received message and deletes notification from queue', async () => {
    const deletedReceipts: string[] = []
    let isDelivered = false

    server.use(
      http.get(getTestUrl('receiveNotification'), async () => {
        if (isDelivered) {
          await delay('infinite')
        }
        isDelivered = true
        return apiResponse({ receiptId: 7, body: createIncomingMessage('Ответ') })
      }),
      http.delete(`${getTestUrl('deleteNotification')}/:receiptId`, ({ params }) => {
        deletedReceipts.push(String(params.receiptId))
        return apiResponse({ result: true })
      }),
    )

    const { store, unmount } = renderReceiveNotifications()

    await waitFor(() => expect(deletedReceipts).toEqual(['7']))
    expect(store.getState().message.byChatId[TEST_CHAT_ID][0].text).toBe('Ответ')
    unmount()
  })

  it('calls onUnauthorized when token is invalid', async () => {
    server.use(http.get(getTestUrl('receiveNotification'), () => apiErrorResponse(401)))

    const { onUnauthorized, unmount } = renderReceiveNotifications()

    await waitFor(() => expect(onUnauthorized).toHaveBeenCalledTimes(1))
    unmount()
  })

  it('retries after server error', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    let requestCount = 0

    server.use(
      http.get(getTestUrl('receiveNotification'), async () => {
        requestCount += 1
        if (requestCount > 1) await delay('infinite')
        return apiErrorResponse(500)
      }),
    )

    const { unmount } = renderReceiveNotifications()

    await waitFor(() => expect(requestCount).toBe(1))
    await vi.advanceTimersByTimeAsync(5000)
    await waitFor(() => expect(requestCount).toBe(2))

    unmount()
    vi.useRealTimers()
  })
})
