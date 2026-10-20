export type MessageDirection = 'incoming' | 'outgoing'

export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed'

export interface Message {
  id: string
  chatId: string
  text: string
  direction: MessageDirection
  timestamp: number
  status?: MessageStatus
}
