import { apiSlice } from "./apiSlice";

export const routesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // is a get method, and I need to pass 3 params
    getRecommendedRoutes: builder.query({
      query: ({ origin, destination, distance }) => ({
        url: `api_Model/ruta_optima/?origen=${origin}&destino=${destination}&bateria_actual=${distance}`,
      }),
      // keepUnusedDataFor: 5,
      providesTags: (result, error, arg) => {
        if (Array.isArray(result)) {
          return [
            { type: "Route", id: "LIST" },
            ...result.map((id) => ({ type: "Route", id })),
          ];
        } else {
          return [{ type: "Route", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { 
  useGetRecommendedRoutesQuery
} = routesSlice;
