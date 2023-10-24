import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getBaseUrl = (nodeEnv) => {
  let url
  switch (nodeEnv) {
    case 'production':
      url = ''
      break
    default:
      url = 'http://127.0.0.1:8000'
  }
  return url
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl(process.env.NODE_ENV)}`,
  credentials: 'include'
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token

  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`)
  //   }
  //   return headers
  // }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // If you want, handle other status codes, too
  // if (result?.error?.status === 403) {
  //   // send refresh token to get new access token
  //   const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

  //   if (refreshResult?.data) {
  //     // store the new token
  //     api.dispatch(setCredentials({ ...refreshResult.data }))

  //     // retry original query with new access token
  //     result = await baseQuery(args, api, extraOptions)
  //   } else {
  //     if (refreshResult?.error?.status === 403) {
  //       refreshResult.error.data.message = 'Your login has expired. '
  //     }
  //     return refreshResult
  //   }
  // }

  return result
}

export const apiSlice = createApi({
  // Change this in development to point to the correct port
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Property', 'User', 'Vehicle', 'Investment'],
  endpoints: (builder) => ({})
})
