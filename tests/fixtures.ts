import type { GreenApiCredentials } from '@/shared/api'

export const TEST_CREDENTIALS: GreenApiCredentials = {
  apiUrl: 'https://1101.api.green-api.com',
  idInstance: '1101000001',
  apiTokenInstance: 'test-token',
}

export const TEST_CHAT_ID = '10000000'
export const TEST_PHONE = '79991234567'

export function getTestUrl(apiMethod: string) {
  const { apiUrl, idInstance, apiTokenInstance } = TEST_CREDENTIALS

  return `${apiUrl}/waInstance${idInstance}/${apiMethod}/${apiTokenInstance}`
}

export function createIncomingMessage(text: string, idMessage = 'incoming-1') {
  return {
    typeWebhook: 'incomingMessageReceived',
    idMessage,
    timestamp: 1763115112,
    senderData: {
      chatId: TEST_CHAT_ID,
      chatType: 'user',
      sender: TEST_CHAT_ID,
      chatName: 'Иван Петров',
      senderName: 'Иван Петров',
      senderContactName: '',
      senderPhoneNumber: Number(TEST_PHONE),
    },
    messageData: {
      typeMessage: 'textMessage',
      textMessageData: { textMessage: text },
    },
  }
}
