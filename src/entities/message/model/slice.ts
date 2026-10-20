import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Message } from './types'

interface MessageState {
  byChatId: Record<string, Message[]>
}

const initialState: MessageState = {
  byChatId: {},
}

const emptyMessages: Message[] = []

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      const message = action.payload
      const messages = (state.byChatId[message.chatId] ??= [])
      if (!messages.some(({ id }) => id === message.id)) messages.push(message)
    },
  },
  selectors: {
    selectMessagesByChatId: (state, chatId: string) => state.byChatId[chatId] ?? emptyMessages,
  },
})

export const { addMessage } = messageSlice.actions
export const { selectMessagesByChatId } = messageSlice.selectors
