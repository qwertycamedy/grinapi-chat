import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/shared/lib/theme'
import { Button } from '@/shared/ui/button'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const label = isDark ? 'Светлая тема' : 'Тёмная тема'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
