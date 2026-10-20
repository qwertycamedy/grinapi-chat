import type { Chat } from '@/entities/chat'
import type { Message } from '@/entities/message'
import { TEST_CHAT_ID, TEST_CREDENTIALS, TEST_PHONE } from './fixtures'

export function createChat(overrides: Partial<Chat> = {}): Chat {
  return {
    id: TEST_CHAT_ID,
    phone: TEST_PHONE,
    name: 'Иван Петров',
    unreadCount: 0,
    ...overrides,
  }
}

export function createMessage(overrides: Partial<Message> = {}): Message {
  return {
    id: 'message-1',
    chatId: TEST_CHAT_ID,
    text: 'Привет',
    direction: 'outgoing',
    timestamp: 1763115112000,
    status: 'sent',
    ...overrides,
  }
}

export function createAuthorizedState(chats: Chat[] = []): Partial<RootState> {
  return {
    session: { credentials: TEST_CREDENTIALS },
    chat: {
      ids: chats.map(({ id }) => id),
      entities: Object.fromEntries(chats.map((chat) => [chat.id, chat])),
    },
  }
}
