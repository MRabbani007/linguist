import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

type QueryResponse<T> = {
  data: T[];
  count: number;
};

const definitionsAdapter = createEntityAdapter<Definition>({
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex > b.sortIndex ? 1 : -1;
    } else {
      return 1;
    }
  },
});

const initialState = definitionsAdapter.getInitialState();

export const definitionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDefinitions: builder.query<QueryResponse<Definition>, number>({
      query: (page) => ({
        url: "/admin/definitions",
        method: "GET",
        params: { page },
      }),
      providesTags: ["Definition"],
    }),
    createDefinition: builder.mutation({
      query: (definition) => ({
        url: "/admin/definitions",
        method: "POST",
        body: { definition },
      }),
      invalidatesTags: ["Definition"],
    }),
    editDefinition: builder.mutation({
      query: (definition) => ({
        url: "/admin/definitions",
        method: "PATCH",
        body: { definition },
      }),
      invalidatesTags: ["Definition"],
    }),
    removeDefinition: builder.mutation({
      query: (id) => ({
        url: "/admin/definitions",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Definition"],
    }),
  }),
});

export const {
  useLazyGetAdminDefinitionsQuery,
  useCreateDefinitionMutation,
  useEditDefinitionMutation,
  useRemoveDefinitionMutation,
} = definitionsApiSlice;
