import { apiSlice } from './apiSlice'

export const vehiclesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => ({
        url: '/api_ElectricVehicle/routes'
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (Array.isArray(result)) {
          return [
            { type: 'Vehicle', id: 'LIST' },
            ...result.map((id) => ({ type: 'Vehicle', id }))
          ]
        } else {
          return [{ type: 'Vehicle', id: 'LIST' }]
        }
      }
    }),
    getVehicle: builder.query({
      query: (id) => `/api_ElectricVehicle/routes/${id}/`
    }),
    createVehicle: builder.mutation({ 
      query: (body) => ({
        url: '/api_ElectricVehicle/routes/',
        method: 'POST',
        body
      })
    }),
    updateVehicle: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api_ElectricVehicle/routes/${id}/`,
        method: 'PATCH',
        body: patch
      })
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/api_ElectricVehicle/routes/${id}/`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetVehicleQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation
} = vehiclesSlice
