import { createMessage } from '@tests/state'
import {
  addMessage,
  failPendingMessages,
  messageSlice,
  resetMessages,
  updateMessageStatus,
} from './slice'

const reducer = messageSlice.reducer

function getState(...actions: Parameters<typeof reducer>[1][]) {
  return actions.reduce(reducer, reducer(undefined, { type: 'init' }))
}

describe('messageSlice', () => {
  it('groups messages by chat id', () => {
    const state = getState(
      addMessage(createMessage({ id: '1', chatId: 'a' })),
      addMessage(createMessage({ id: '2', chatId: 'b' })),
    )

    expect(Object.keys(state.byChatId)).toEqual(['a', 'b'])
  })

  it('does not add duplicate message', () => {
    const state = getState(addMessage(createMessage()), addMessage(createMessage()))

    expect(state.byChatId['10000000']).toHaveLength(1)
  })

  it('updates status and replaces temporary id', () => {
    const state = getState(
      addMessage(createMessage({ id: 'temp', status: 'pending' })),
      updateMessageStatus({ chatId: '10000000', messageId: 'temp', status: 'sent', newMessageId: 'real' }),
    )

    expect(state.byChatId['10000000'][0]).toMatchObject({ id: 'real', status: 'sent' })
  })

  it('marks pending messages as failed', () => {
    const state = getState(
      addMessage(createMessage({ id: '1', status: 'pending' })),
      addMessage(createMessage({ id: '2', status: 'sent' })),
      failPendingMessages(),
    )

    expect(state.byChatId['10000000'].map(({ status }) => status)).toEqual(['failed', 'sent'])
  })

  it('returns stable empty list for chat without messages', () => {
    const rootState = { message: getState() } as RootState
    const select = messageSlice.selectors.selectMessagesByChatId

    expect(select(rootState, 'none')).toBe(select(rootState, 'none'))
  })

  it('resets messages', () => {
    const state = getState(addMessage(createMessage()), resetMessages())

    expect(state.byChatId).toEqual({})
  })
})
