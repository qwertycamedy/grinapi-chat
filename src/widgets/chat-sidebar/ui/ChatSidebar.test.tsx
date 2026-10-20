import { screen } from '@testing-library/react'
import { http } from 'msw'
import { getTestUrl } from '@tests/fixtures'
import { renderWithProviders } from '@tests/render-with-providers'
import { apiResponse } from '@tests/responses'
import { server } from '@tests/server'
import { createAuthorizedState, createChat } from '@tests/state'
import { ChatSidebar } from './ChatSidebar'

const disabledSettings = { wid: '1', webhookUrl: '', incomingWebhook: 'no', outgoingWebhook: 'no' }

describe('ChatSidebar', () => {
  it('shows empty state', () => {
    renderWithProviders(<ChatSidebar />, { preloadedState: createAuthorizedState() })

    expect(screen.getByText('Пока нет чатов')).toBeInTheDocument()
  })

  it('shows chats with preview and unread counter', () => {
    renderWithProviders(<ChatSidebar />, {
      preloadedState: createAuthorizedState([
        createChat({ lastMessageText: 'Как дела?', lastMessageAt: Date.now(), unreadCount: 3 }),
      ]),
    })

    const chatLink = screen.getByRole('link', { name: /Иван Петров/ })
    expect(chatLink).toHaveAttribute('href', '/chats/10000000')
    expect(chatLink).toHaveTextContent('Как дела?')
    expect(chatLink).toHaveTextContent('3')
  })

  it('logs out and clears chats', async () => {
    const { user, store } = renderWithProviders(<ChatSidebar />, {
      preloadedState: createAuthorizedState([createChat()]),
    })

    await user.click(screen.getByRole('button', { name: 'Выйти' }))

    expect(store.getState().session.credentials).toBeNull()
    expect(store.getState().chat.ids).toEqual([])
  })

  it('warns when incoming notifications are disabled and enables them', async () => {
    let savedSettings: unknown
    let settings = disabledSettings
    server.use(
      http.get(getTestUrl('getSettings'), () => apiResponse(settings)),
      http.post(getTestUrl('setSettings'), async ({ request }) => {
        savedSettings = await request.json()
        settings = { ...settings, incomingWebhook: 'yes' }
        return apiResponse({ saveSettings: true })
      }),
    )
    const { user } = renderWithProviders(<ChatSidebar />, { preloadedState: createAuthorizedState() })

    await user.click(await screen.findByRole('button', { name: 'Включить' }))

    await vi.waitFor(() => expect(screen.queryByRole('button', { name: 'Включить' })).not.toBeInTheDocument())
    expect(savedSettings).toEqual({ webhookUrl: '', incomingWebhook: 'yes' })
  })
})
