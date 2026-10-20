import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = Exclude<Theme, 'system'>

const THEME_STORAGE_KEY = 'green-api-chat:theme'
const listeners = new Set<() => void>()
const darkModeQuery =
  typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : null

let currentTheme = readStoredTheme()

function readStoredTheme(): Theme {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system'
  } catch {
    return 'system'
  }
}

function getResolvedTheme(): ResolvedTheme {
  if (currentTheme !== 'system') return currentTheme

  return darkModeQuery?.matches ? 'dark' : 'light'
}

function applyTheme() {
  const resolvedTheme = getResolvedTheme()
  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  document.documentElement.style.colorScheme = resolvedTheme
}

function notifyListeners() {
  applyTheme()
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function setTheme(theme: Theme) {
  currentTheme = theme

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    return notifyListeners()
  }

  notifyListeners()
}

export function initTheme() {
  applyTheme()
  darkModeQuery?.addEventListener('change', notifyListeners)
}

export function useTheme() {
  const resolvedTheme = useSyncExternalStore(subscribe, getResolvedTheme)

  return { resolvedTheme, setTheme }
}
