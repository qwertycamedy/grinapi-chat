export interface SendMessageRequest {
  chatId: string
  message: string
}

export interface SendMessageResponse {
  idMessage: string
}

export interface SenderData {
  chatId: string
  chatType?: string
  chatName?: string
  sender: string
  senderName?: string
  senderContactName?: string
  senderPhoneNumber?: number
}

export interface MessageData {
  typeMessage: string
  textMessageData?: { textMessage: string }
  extendedTextMessageData?: { text: string }
}

export interface IncomingMessageNotification {
  typeWebhook: 'incomingMessageReceived'
  idMessage: string
  timestamp: number
  senderData: SenderData
  messageData: MessageData
}

export type NotificationBody = IncomingMessageNotification | { typeWebhook: string }

export interface ReceivedNotification {
  receiptId: number
  body: NotificationBody
}

export interface DeleteNotificationResponse {
  result: boolean
}
