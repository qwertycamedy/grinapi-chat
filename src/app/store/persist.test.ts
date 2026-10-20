import { login } from '@/entities/session'
import { STORAGE_KEYS } from '@/shared/config'
import { TEST_CREDENTIALS } from '@tests/fixtures'
import { loadPersistedState, persistState } from './persist'
import { setupStore } from './store'

describe('persistState', () => {
  it('saves session, chats and messages to localStorage', () => {
    const store = setupStore()
    persistState(store)

    store.dispatch(login(TEST_CREDENTIALS))

    expect(loadPersistedState()).toEqual({
      session: { credentials: TEST_CREDENTIALS },
      chat: { ids: [], entities: {} },
      message: { byChatId: {} },
    })
  })

  it('returns undefined for broken storage value', () => {
    localStorage.setItem(STORAGE_KEYS.appState, '{broken')

    expect(loadPersistedState()).toBeUndefined()
  })
})
