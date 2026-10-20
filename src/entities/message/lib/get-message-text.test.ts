import { getMessageText } from './get-message-text'

describe('getMessageText', () => {
  it('reads plain text message', () => {
    expect(getMessageText({ typeMessage: 'textMessage', textMessageData: { textMessage: 'Привет' } })).toBe(
      'Привет',
    )
  })

  it('reads text message with link', () => {
    expect(
      getMessageText({ typeMessage: 'extendedTextMessage', extendedTextMessageData: { text: 'https://x.ru' } }),
    ).toBe('https://x.ru')
  })

  it('returns null for non text messages', () => {
    expect(getMessageText({ typeMessage: 'imageMessage' })).toBeNull()
  })
})
