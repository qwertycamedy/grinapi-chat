import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { GreenApiCredentials } from '@/shared/api'

interface SessionState {
  credentials: GreenApiCredentials | null
}

const initialState: SessionState = {
  credentials: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login(state, action: PayloadAction<GreenApiCredentials>) {
      state.credentials = action.payload
    },
    logout(state) {
      state.credentials = null
    },
  },
  selectors: {
    selectCredentials: (state) => state.credentials,
    selectIsAuthorized: (state) => state.credentials !== null,
  },
})

export const { login, logout } = sessionSlice.actions
export const { selectCredentials, selectIsAuthorized } = sessionSlice.selectors
