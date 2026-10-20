export const ROUTES = {
  login: '/login',
  chats: '/',
  chat: '/chats/:chatId',
} as const

export function getChatRoute(chatId: string) {
  return `/chats/${encodeURIComponent(chatId)}`
}
