import { setupStore } from '@/app/store'

export function createTestStore(preloadedState?: Partial<RootState>) {
  return setupStore(preloadedState)
}
