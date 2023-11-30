import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getBaseUrl = (nodeEnv) => {
  switch (nodeEnv) {
    case 'production':
      return '';
    default:
      return 'http://127.0.0.1:8000';
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(process.env.NODE_ENV),
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    // Aquí puedes manejar el refresh token si es necesario
    // Puedes revisar el estado del resultado, si hay un código de estado 403, etc.

    return result;
  } catch (error) {
    // Puedes manejar errores aquí si es necesario
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    deleteChargePoint: builder.mutation({
      query: (id) => ({
        url: `/api_ChargePoint/routes/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteChargePointMutation } = apiSlice;
