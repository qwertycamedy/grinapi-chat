import { createIncomingMessage, TEST_CHAT_ID } from '@tests/fixtures'
import { createTestStore } from '@tests/store'
import { createAuthorizedState, createChat } from '@tests/state'
import { handleNotification } from './handle-notification'

describe('handleNotification', () => {
  it('creates chat for unknown sender and adds message', () => {
    const store = createTestStore(createAuthorizedState())

    store.dispatch(handleNotification(createIncomingMessage('Привет')))

    const state = store.getState()
    expect(state.chat.entities[TEST_CHAT_ID]).toMatchObject({
      name: 'Иван Петров',
      phone: '79991234567',
      unreadCount: 1,
      lastMessageText: 'Привет',
    })
    expect(state.message.byChatId[TEST_CHAT_ID]).toEqual([
      {
        id: 'incoming-1',
        chatId: TEST_CHAT_ID,
        text: 'Привет',
        direction: 'incoming',
        timestamp: 1763115112000,
      },
    ])
  })

  it('keeps existing chat name', () => {
    const store = createTestStore(createAuthorizedState([createChat({ name: 'Мой контакт' })]))

    store.dispatch(handleNotification(createIncomingMessage('Привет')))

    expect(store.getState().chat.entities[TEST_CHAT_ID].name).toBe('Мой контакт')
  })

  it('ignores group messages', () => {
    const store = createTestStore(createAuthorizedState())
    const notification = createIncomingMessage('Привет')
    notification.senderData.chatType = 'group'

    store.dispatch(handleNotification(notification))

    expect(store.getState().chat.ids).toEqual([])
  })

  it('ignores non text messages and other notification types', () => {
    const store = createTestStore(createAuthorizedState())
    const imageNotification = createIncomingMessage('')
    imageNotification.messageData = { typeMessage: 'imageMessage' } as never

    store.dispatch(handleNotification(imageNotification))
    store.dispatch(handleNotification({ typeWebhook: 'stateInstanceChanged' }))

    expect(store.getState().chat.ids).toEqual([])
  })
})
