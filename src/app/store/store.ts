import { combineReducers, configureStore, type ThunkAction, type UnknownAction } from '@reduxjs/toolkit'
import { sessionSlice } from '@/entities/session'
import { chatSlice } from '@/entities/chat'
import { failPendingMessages, messageSlice } from '@/entities/message'
import { greenApi } from '@/shared/api'
import { loadPersistedState, persistState } from './persist'

const rootReducer = combineReducers({
  [sessionSlice.reducerPath]: sessionSlice.reducer,
  [chatSlice.reducerPath]: chatSlice.reducer,
  [messageSlice.reducerPath]: messageSlice.reducer,
  [greenApi.reducerPath]: greenApi.reducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(greenApi.middleware),
  })
}

export const store = setupStore(loadPersistedState())

store.dispatch(failPendingMessages())
persistState(store)

declare global {
  type RootState = ReturnType<typeof rootReducer>
  type AppStore = ReturnType<typeof setupStore>
  type AppDispatch = AppStore['dispatch']
  type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>
}
