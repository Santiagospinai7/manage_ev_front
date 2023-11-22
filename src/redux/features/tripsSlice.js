import { apiSlice } from './apiSlice'

export const tripsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrips: builder.query({
      query: () => ({
        url: '/api_Trip/routes/',
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (Array.isArray(result)) {
          return [
            { type: 'trips', id: 'LIST' },
            ...result.map((id) => ({ type: 'trips', id }))
          ]
        } else {
          return [{ type: 'trips', id: 'LIST' }]
        }
      }
    }),
    getTrip: builder.query({
      query: (id) => `/api_Trip/routes/${id}/`
    }),
  })
})

export const {
  useGetTripsQuery,
  useGetTripQuery,
} = tripsSlice
