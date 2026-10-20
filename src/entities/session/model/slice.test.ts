import { TEST_CREDENTIALS } from '@tests/fixtures'
import { login, logout, sessionSlice } from './slice'

describe('sessionSlice', () => {
  it('stores credentials on login and clears them on logout', () => {
    const loggedIn = sessionSlice.reducer(undefined, login(TEST_CREDENTIALS))
    const loggedOut = sessionSlice.reducer(loggedIn, logout())

    expect(sessionSlice.selectors.selectIsAuthorized({ session: loggedIn } as RootState)).toBe(true)
    expect(loggedOut.credentials).toBeNull()
  })
})
