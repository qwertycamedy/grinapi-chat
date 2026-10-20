export function loadFromStorage<T>(key: string): T | undefined {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : undefined
  } catch {
    return undefined
  }
}

export function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return
  }
}

export function removeFromStorage(key: string) {
  try {
    localStorage.removeItem(key)
  } catch {
    return
  }
}
