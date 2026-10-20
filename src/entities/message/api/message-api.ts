import { greenApi } from '@/shared/api'
import { RECEIVE_TIMEOUT_SECONDS, REQUEST_TIMEOUT_MS } from '@/shared/config'
import type {
  DeleteNotificationResponse,
  ReceivedNotification,
  SendMessageRequest,
  SendMessageResponse,
} from './types'

export const messageApi = greenApi.injectEndpoints({
  endpoints: (build) => ({
    sendMessage: build.mutation<SendMessageResponse, SendMessageRequest>({
      query: (data) => ({ apiMethod: 'sendMessage', httpMethod: 'POST', data }),
    }),
    receiveNotification: build.mutation<ReceivedNotification | null, void>({
      query: () => ({
        apiMethod: 'receiveNotification',
        params: { receiveTimeout: RECEIVE_TIMEOUT_SECONDS },
        timeout: RECEIVE_TIMEOUT_SECONDS * 1000 + REQUEST_TIMEOUT_MS,
      }),
    }),
    deleteNotification: build.mutation<DeleteNotificationResponse, number>({
      query: (receiptId) => ({
        apiMethod: 'deleteNotification',
        httpMethod: 'DELETE',
        pathParam: receiptId,
      }),
    }),
  }),
})

export const { useSendMessageMutation } = messageApi
