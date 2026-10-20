import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { setupStore } from '@/app/store'
import { createAuthorizedState, createChat } from '@tests/state'
import { routes } from './router'

function renderRoute(route: string, preloadedState?: Partial<RootState>) {
  const router = createMemoryRouter(routes, { initialEntries: [route] })
  render(
    <Provider store={setupStore(preloadedState)}>
      <RouterProvider router={router} />
    </Provider>,
  )

  return router
}

describe('routes', () => {
  it('redirects guest to login page', async () => {
    const router = renderRoute('/chats/1')

    expect(await screen.findByRole('button', { name: 'Войти' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/login')
  })

  it('redirects authorized user from login to chats', async () => {
    const router = renderRoute('/login', createAuthorizedState())

    expect(await screen.findByRole('heading', { name: 'Чаты' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/')
  })

  it('opens chat by url', async () => {
    renderRoute('/chats/10000000', createAuthorizedState([createChat()]))

    expect(await screen.findByRole('heading', { name: 'Иван Петров', level: 2 })).toBeInTheDocument()
  })

  it('redirects unknown route to chats', async () => {
    const router = renderRoute('/unknown', createAuthorizedState())

    await screen.findByRole('heading', { name: 'Чаты' })
    expect(router.state.location.pathname).toBe('/')
  })
})
