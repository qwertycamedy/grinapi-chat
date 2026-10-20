import { STORAGE_KEYS } from '@/shared/config'
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage'

type PersistedState = Pick<RootState, 'session' | 'chat' | 'message'>

export function loadPersistedState() {
  return loadFromStorage<PersistedState>(STORAGE_KEYS.appState)
}

export function persistState(store: AppStore) {
  let previousState: PersistedState | null = null

  store.subscribe(() => {
    const { session, chat, message } = store.getState()
    if (
      previousState?.session === session &&
      previousState.chat === chat &&
      previousState.message === message
    ) {
      return
    }

    previousState = { session, chat, message }
    saveToStorage(STORAGE_KEYS.appState, previousState)
  })
}
