import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Message, MessageStatus } from './types'

interface MessageState {
  byChatId: Record<string, Message[]>
}

interface MessageStatusUpdate {
  chatId: string
  messageId: string
  status: MessageStatus
  newMessageId?: string
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
    updateMessageStatus(state, action: PayloadAction<MessageStatusUpdate>) {
      const { chatId, messageId, status, newMessageId } = action.payload
      const message = state.byChatId[chatId]?.find(({ id }) => id === messageId)
      if (!message) return

      message.status = status
      if (newMessageId) message.id = newMessageId
    },
    failPendingMessages(state) {
      Object.values(state.byChatId)
        .flat()
        .filter((message) => message.status === 'pending')
        .forEach((message) => {
          message.status = 'failed'
        })
    },
    resetMessages() {
      return initialState
    },
  },
  selectors: {
    selectMessagesByChatId: (state, chatId: string) => state.byChatId[chatId] ?? emptyMessages,
  },
})

export const { addMessage, updateMessageStatus, failPendingMessages, resetMessages } =
  messageSlice.actions
export const { selectMessagesByChatId } = messageSlice.selectors
