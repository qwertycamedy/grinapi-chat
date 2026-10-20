import { screen } from '@testing-library/react'
import { http } from 'msw'
import { getTestUrl, TEST_CHAT_ID, TEST_PHONE } from '@tests/fixtures'
import { renderWithProviders } from '@tests/render-with-providers'
import { apiResponse } from '@tests/responses'
import { server } from '@tests/server'
import { createAuthorizedState, createChat } from '@tests/state'
import { CreateChatDialog } from './CreateChatDialog'

async function submitPhone(user: ReturnType<typeof renderWithProviders>['user'], phone: string, name = '') {
  await user.click(screen.getByRole('button', { name: 'Новый чат' }))
  await user.type(screen.getByLabelText('Номер телефона'), phone)
  if (name) await user.type(screen.getByLabelText('Имя (необязательно)'), name)
  await user.click(screen.getByRole('button', { name: 'Создать чат' }))
}

describe('CreateChatDialog', () => {
  it('validates phone number', async () => {
    const { user } = renderWithProviders(<CreateChatDialog />, { preloadedState: createAuthorizedState() })

    await submitPhone(user, '123')

    expect(screen.getByText(/Введите номер в международном формате/)).toBeInTheDocument()
  })

  it('creates chat with chat id from checkAccount and opens it', async () => {
    let requestBody: unknown
    server.use(
      http.post(getTestUrl('checkAccount'), async ({ request }) => {
        requestBody = await request.json()
        return apiResponse({ exist: true, chatId: TEST_CHAT_ID })
      }),
    )
    const { user, store } = renderWithProviders(<CreateChatDialog />, {
      preloadedState: createAuthorizedState(),
    })

    await submitPhone(user, '8 999 123-45-67', 'Иван')

    await vi.waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent(`/chats/${TEST_CHAT_ID}`))
    expect(requestBody).toEqual({ phoneNumber: Number(TEST_PHONE) })
    expect(store.getState().chat.entities[TEST_CHAT_ID]).toMatchObject({ name: 'Иван', phone: TEST_PHONE })
  })

  it('shows error when account does not exist', async () => {
    server.use(http.post(getTestUrl('checkAccount'), () => apiResponse({ exist: false, chatId: '' })))
    const { user, store } = renderWithProviders(<CreateChatDialog />, {
      preloadedState: createAuthorizedState(),
    })

    await submitPhone(user, TEST_PHONE)

    expect(await screen.findByText(/Аккаунт Telegram с этим номером не найден/)).toBeInTheDocument()
    expect(store.getState().chat.ids).toEqual([])
  })

  it('opens existing chat without request', async () => {
    const checkAccount = vi.fn()
    server.use(http.post(getTestUrl('checkAccount'), checkAccount))
    const { user } = renderWithProviders(<CreateChatDialog />, {
      preloadedState: createAuthorizedState([createChat()]),
    })

    await submitPhone(user, TEST_PHONE)

    expect(screen.getByTestId('location')).toHaveTextContent(`/chats/${TEST_CHAT_ID}`)
    expect(checkAccount).not.toHaveBeenCalled()
  })
})
