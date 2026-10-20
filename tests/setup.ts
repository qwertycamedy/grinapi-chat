import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { server } from './server'

Element.prototype.scrollIntoView = vi.fn()

beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))

afterEach(() => {
  cleanup()
  server.resetHandlers()
  localStorage.clear()
})

afterAll(() => server.close())
