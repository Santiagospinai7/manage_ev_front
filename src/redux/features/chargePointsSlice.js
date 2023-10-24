import { apiSlice } from './apiSlice'

export const chargePointsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChargePoints: builder.query({
      query: () => ({
        url: '/api_ChargePoint/routes/',
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (Array.isArray(result)) {
          return [
            { type: 'ChargePoint', id: 'LIST' },
            ...result.map((id) => ({ type: 'ChargePoint', id }))
          ]
        } else {
          return [{ type: 'ChargePoint', id: 'LIST' }]
        }
      }
    }),
    getChargePoint: builder.query({
      query: (id) => `/api_ChargePoint/routes/${id}/`
    }),
    createChargePoint: builder.mutation({ 
      query: (body) => ({
        url: '/api_ChargePoint/routes/',
        method: 'POST',
        body
      })
    }),
    updateChargePoint: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api_ChargePoint/routes/${id}/`,
        method: 'PATCH',
        body: patch
      })
    }),
    deleteChargePoint: builder.mutation({
      query: (id) => ({
        url: `/api_ChargePoint/routes/${id}/`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetChargePointsQuery,
  useGetChargePointQuery,
  useCreateChargePointMutation,
  useUpdateChargePointMutation,
  useDeleteChargePointMutation
} = chargePointsSlice
