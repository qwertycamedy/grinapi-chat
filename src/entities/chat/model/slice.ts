import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Chat, ChatPreviewUpdate } from './types'

const chatAdapter = createEntityAdapter<Chat>({
  sortComparer: (a, b) => (b.lastMessageAt ?? 0) - (a.lastMessageAt ?? 0),
})

const chatSelectors = chatAdapter.getSelectors()

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState(),
  reducers: {
    addChat: chatAdapter.addOne,
    updateChatPreview(state, action: PayloadAction<ChatPreviewUpdate>) {
      const { chatId, text, timestamp, isUnread } = action.payload
      const chat = state.entities[chatId]
      if (!chat) return

      chatAdapter.updateOne(state, {
        id: chatId,
        changes: {
          lastMessageText: text,
          lastMessageAt: timestamp,
          unreadCount: isUnread ? chat.unreadCount + 1 : chat.unreadCount,
        },
      })
    },
    markChatAsRead(state, action: PayloadAction<string>) {
      const chat = state.entities[action.payload]
      if (chat) chat.unreadCount = 0
    },
    resetChats: chatAdapter.removeAll,
  },
  selectors: {
    selectChats: chatSelectors.selectAll,
    selectChatById: (state, chatId: string) => chatSelectors.selectById(state, chatId) ?? null,
  },
})

export const { addChat, updateChatPreview, markChatAsRead, resetChats } = chatSlice.actions
export const { selectChats, selectChatById } = chatSlice.selectors
