import { screen } from '@testing-library/react'
import { http } from 'msw'
import { getTestUrl, TEST_CREDENTIALS } from '@tests/fixtures'
import { renderWithProviders } from '@tests/render-with-providers'
import { apiErrorResponse, apiResponse } from '@tests/responses'
import { server } from '@tests/server'
import { LoginForm } from './LoginForm'

async function fillForm(user: ReturnType<typeof renderWithProviders>['user']) {
  await user.type(screen.getByLabelText('idInstance'), TEST_CREDENTIALS.idInstance)
  await user.type(screen.getByLabelText('apiTokenInstance'), TEST_CREDENTIALS.apiTokenInstance)
  await user.click(screen.getByRole('button', { name: 'Войти' }))
}

describe('LoginForm', () => {
  it('shows validation errors for empty form', async () => {
    const { user } = renderWithProviders(<LoginForm />)

    await user.click(screen.getByRole('button', { name: 'Войти' }))

    expect(screen.getByText('idInstance должен состоять из цифр')).toBeInTheDocument()
    expect(screen.getByText('Укажите apiTokenInstance')).toBeInTheDocument()
  })

  it('fills apiUrl from idInstance', async () => {
    const { user } = renderWithProviders(<LoginForm />)

    await user.type(screen.getByLabelText('idInstance'), TEST_CREDENTIALS.idInstance)

    expect(screen.getByLabelText('apiUrl')).toHaveValue(TEST_CREDENTIALS.apiUrl)
  })

  it('logs in when instance is authorized', async () => {
    const { user, store } = renderWithProviders(<LoginForm />)

    await fillForm(user)

    await vi.waitFor(() => expect(store.getState().session.credentials).toEqual(TEST_CREDENTIALS))
  })

  it('shows instance state error', async () => {
    server.use(http.get(getTestUrl('getStateInstance'), () => apiResponse({ stateInstance: 'notAuthorized' })))
    const { user, store } = renderWithProviders(<LoginForm />)

    await fillForm(user)

    expect(await screen.findByRole('alert')).toHaveTextContent('Инстанс не авторизован')
    expect(store.getState().session.credentials).toBeNull()
  })

  it('shows api error for invalid token', async () => {
    server.use(http.get(getTestUrl('getStateInstance'), () => apiErrorResponse(401)))
    const { user } = renderWithProviders(<LoginForm />)

    await fillForm(user)

    expect(await screen.findByRole('alert')).toHaveTextContent('Неверный idInstance или apiTokenInstance')
  })
})
