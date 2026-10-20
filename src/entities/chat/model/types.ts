export interface Chat {
  id: string
  phone: string
  name: string
  unreadCount: number
  lastMessageText?: string
  lastMessageAt?: number
}
