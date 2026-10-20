import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setTheme } from '@/shared/lib/theme'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => setTheme('light'))

  it('switches between light and dark theme', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button', { name: 'Тёмная тема' }))

    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('green-api-chat:theme')).toBe('dark')

    await user.click(screen.getByRole('button', { name: 'Светлая тема' }))

    expect(document.documentElement).not.toHaveClass('dark')
  })
})
