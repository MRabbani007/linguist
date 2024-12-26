import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

// TODO: change compare value to date or sort option
const wordsAdapter = createEntityAdapter({
  // selectId: (word) => word.id,
  // sortComparer: (a, b) => {
  //   if (a.sortIndex && b.sortIndex) {
  //     return a.sortIndex.toString().localeCompare(b.sortIndex.toString());
  //   } else {
  //     return a.blockID.localeCompare(b.blockID);
  //   }
  // },
});

const initialState = wordsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWords: builder.query<{ data: Word[]; count: number }, number>({
      query: (page) => ({
        url: "/admin/words",
        method: "GET",
        params: { page },
      }),
      providesTags: ["Word"],
    }),
    addWord: builder.mutation({
      query: (word) => ({
        url: "/admin/words",
        method: "POST",
        body: { word },
      }),
      invalidatesTags: ["Word"],
    }),
    editWord: builder.mutation({
      query: (word) => ({
        url: "/admin/words",
        method: "PATCH",
        body: { word },
      }),
      invalidatesTags: ["Word"],
    }),
    removeWord: builder.mutation({
      query: (id) => ({
        url: "/admin/words",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Word"],
    }),
  }),
});

export const {
  useLazyGetWordsQuery,
  useAddWordMutation,
  useEditWordMutation,
  useRemoveWordMutation,
} = extendedApiSlice;

// returns the query result object
// export const selectWordsResult = extendedApiSlice.endpoints.getWords.select();

// Creates memoized selector
// const selectWordsData = createSelector(
//   selectWordsResult,
//   (wordResult) => wordResult.data // normalized state object with ids & entities
// );

//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllWords,
//   // Pass in a selector that returns the posts slice of state
// } = wordsAdapter.getSelectors(
//   (state) => selectWordsData(state) ?? initialState
// );
