import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axios-base-query'

export const greenApi = createApi({
  reducerPath: 'greenApi',
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
})
