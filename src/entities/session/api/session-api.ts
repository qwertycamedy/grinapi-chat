import { greenApi, type GreenApiCredentials } from '@/shared/api'
import type { InstanceSettings, SaveSettingsResponse, StateInstanceResponse } from './types'

export const sessionApi = greenApi.injectEndpoints({
  endpoints: (build) => ({
    getStateInstance: build.mutation<StateInstanceResponse, GreenApiCredentials>({
      query: (credentials) => ({ apiMethod: 'getStateInstance', credentials }),
    }),
    getSettings: build.query<InstanceSettings, void>({
      query: () => ({ apiMethod: 'getSettings' }),
      providesTags: ['Settings'],
    }),
    setSettings: build.mutation<SaveSettingsResponse, Partial<InstanceSettings>>({
      query: (settings) => ({ apiMethod: 'setSettings', httpMethod: 'POST', data: settings }),
      invalidatesTags: ['Settings'],
    }),
  }),
})

export const { useGetStateInstanceMutation, useGetSettingsQuery, useSetSettingsMutation } = sessionApi
