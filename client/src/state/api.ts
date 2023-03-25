import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse } from "./type";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Producs"],
    endpoints: (build) => ({
        // response, payload
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: () => "kpi/kpis",

            // tag to identify
            providesTags: ["Kpis"],
        }),
        // build.mutation // for post...
        getProducts: build.query<Array<GetProductsResponse>, void>({
            query: () => "product/products/",

            // tag to identify
            providesTags: ["Producs"],
            // invalidatesTags:[] like call for delete or update
        }),
    }),
});

export const { useGetKpisQuery, useGetProductsQuery } = api;
