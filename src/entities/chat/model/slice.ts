import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { Chat } from './types'

const chatAdapter = createEntityAdapter<Chat>({
  sortComparer: (a, b) => (b.lastMessageAt ?? 0) - (a.lastMessageAt ?? 0),
})

const chatSelectors = chatAdapter.getSelectors()

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState(),
  reducers: {
    addChat: chatAdapter.addOne,
  },
  selectors: {
    selectChats: chatSelectors.selectAll,
    selectChatById: (state, chatId: string) => chatSelectors.selectById(state, chatId) ?? null,
  },
})

export const { addChat } = chatSlice.actions
export const { selectChats, selectChatById } = chatSlice.selectors
