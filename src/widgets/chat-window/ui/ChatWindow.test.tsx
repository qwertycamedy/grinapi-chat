import { screen, within } from '@testing-library/react'
import { http } from 'msw'
import { getTestUrl, TEST_CHAT_ID } from '@tests/fixtures'
import { renderWithProviders } from '@tests/render-with-providers'
import { apiErrorResponse, apiResponse } from '@tests/responses'
import { server } from '@tests/server'
import { createAuthorizedState, createChat, createMessage } from '@tests/state'
import { ChatWindow } from './ChatWindow'

function renderChatWindow(preloadedState = createAuthorizedState([createChat()])) {
  return renderWithProviders(<ChatWindow chatId={TEST_CHAT_ID} />, { preloadedState })
}

describe('ChatWindow', () => {
  it('shows chat header and messages', () => {
    renderChatWindow({
      ...createAuthorizedState([createChat()]),
      message: {
        byChatId: {
          [TEST_CHAT_ID]: [
            createMessage({ id: '1', text: 'Привет', direction: 'outgoing' }),
            createMessage({ id: '2', text: 'Здравствуйте', direction: 'incoming', status: undefined }),
          ],
        },
      },
    })

    expect(screen.getByRole('heading', { name: 'Иван Петров' })).toBeInTheDocument()
    expect(screen.getByText('+7 999 123-45-67')).toBeInTheDocument()
    const messages = screen.getByRole('log', { name: 'Сообщения' })
    expect(within(messages).getByText('Привет')).toBeInTheDocument()
    expect(within(messages).getByText('Здравствуйте')).toBeInTheDocument()
  })

  it('marks chat as read when opened', () => {
    const { store } = renderChatWindow(createAuthorizedState([createChat({ unreadCount: 2 })]))

    expect(store.getState().chat.entities[TEST_CHAT_ID].unreadCount).toBe(0)
  })

  it('shows not found state for unknown chat', () => {
    renderChatWindow(createAuthorizedState())

    expect(screen.getByText('Чат не найден')).toBeInTheDocument()
  })

  it('sends message and marks it as sent', async () => {
    let requestBody: unknown
    server.use(
      http.post(getTestUrl('sendMessage'), async ({ request }) => {
        requestBody = await request.json()
        return apiResponse({ idMessage: 'sent-1' })
      }),
    )
    const { user, store } = renderChatWindow()

    await user.type(screen.getByLabelText('Текст сообщения'), '  Привет!  {Enter}')

    expect(await screen.findByLabelText('Отправлено')).toBeInTheDocument()
    expect(requestBody).toEqual({ chatId: TEST_CHAT_ID, message: 'Привет!' })
    expect(store.getState().message.byChatId[TEST_CHAT_ID][0]).toMatchObject({ id: 'sent-1', status: 'sent' })
    expect(screen.getByLabelText('Текст сообщения')).toHaveValue('')
  })

  it('keeps new line on shift enter and does not send empty message', async () => {
    const { user, store } = renderChatWindow()
    const textarea = screen.getByLabelText('Текст сообщения')

    await user.type(textarea, '{Enter}')
    await user.type(textarea, 'a{Shift>}{Enter}{/Shift}b')

    expect(textarea).toHaveValue('a\nb')
    expect(store.getState().message.byChatId[TEST_CHAT_ID]).toBeUndefined()
    expect(screen.getByRole('button', { name: 'Отправить' })).toBeEnabled()
  })

  it('marks message as failed when sending fails', async () => {
    server.use(http.post(getTestUrl('sendMessage'), () => apiErrorResponse(500)))
    const { user } = renderChatWindow()

    await user.type(screen.getByLabelText('Текст сообщения'), 'Привет{Enter}')

    expect(await screen.findByLabelText('Не отправлено')).toBeInTheDocument()
  })
})
