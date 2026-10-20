import { createChat } from '@tests/state'
import { addChat, chatSlice, markChatAsRead, resetChats, updateChatPreview } from './slice'

const reducer = chatSlice.reducer

function getState(...actions: Parameters<typeof reducer>[1][]) {
  return actions.reduce(reducer, reducer(undefined, { type: 'init' }))
}

function selectChats(state: ReturnType<typeof reducer>) {
  return chatSlice.selectors.selectChats({ chat: state } as RootState)
}

describe('chatSlice', () => {
  it('adds chat', () => {
    const state = getState(addChat(createChat()))

    expect(selectChats(state)).toEqual([createChat()])
  })

  it('updates preview and increments unread count', () => {
    const state = getState(
      addChat(createChat()),
      updateChatPreview({ chatId: '10000000', text: 'Привет', timestamp: 100, isUnread: true }),
      updateChatPreview({ chatId: '10000000', text: 'Как дела?', timestamp: 200, isUnread: true }),
    )

    expect(state.entities['10000000']).toMatchObject({
      lastMessageText: 'Как дела?',
      lastMessageAt: 200,
      unreadCount: 2,
    })
  })

  it('ignores preview for unknown chat', () => {
    const state = getState(updateChatPreview({ chatId: 'unknown', text: 'x', timestamp: 1, isUnread: true }))

    expect(state.ids).toEqual([])
  })

  it('sorts chats by last message time', () => {
    const state = getState(
      addChat(createChat({ id: 'old', lastMessageAt: 100 })),
      addChat(createChat({ id: 'new', lastMessageAt: 200 })),
    )

    expect(selectChats(state).map(({ id }) => id)).toEqual(['new', 'old'])
  })

  it('marks chat as read', () => {
    const state = getState(addChat(createChat({ unreadCount: 3 })), markChatAsRead('10000000'))

    expect(state.entities['10000000'].unreadCount).toBe(0)
  })

  it('resets chats', () => {
    const state = getState(addChat(createChat()), resetChats())

    expect(state.ids).toEqual([])
  })
})
