export interface Chat {
  id: string
  phone: string
  name: string
  unreadCount: number
  lastMessageText?: string
  lastMessageAt?: number
}

export interface ChatPreviewUpdate {
  chatId: string
  text: string
  timestamp: number
  isUnread: boolean
}
