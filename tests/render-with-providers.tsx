import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { createTestStore } from './store'

interface RenderOptions {
  preloadedState?: Partial<RootState>
  route?: string
  path?: string
}

function LocationProbe() {
  const location = useLocation()

  return <div data-testid="location">{location.pathname}</div>
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = '/', path = '*' }: RenderOptions = {},
) {
  const store = createTestStore(preloadedState)

  return {
    store,
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
          <LocationProbe />
        </MemoryRouter>
      </Provider>,
    ),
  }
}
