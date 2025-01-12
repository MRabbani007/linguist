import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

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

export const wordsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWords: builder.query<{ data: Word[]; count: number }, number>({
      query: (page) => ({
        url: "/admin/words",
        method: "GET",
        params: { page },
      }),
      transformResponse: (response: any) => {
        // Assuming the API response is { todos: [...], total: number }
        const { data, count }: { data: Word[]; count: number } = response;
        return { data, count }; // Structure the response for easy usage in components
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.data.map(({ id }) => ({ type: "Word" as const, id })), // Provide tags for each todo
              { type: "Word", id: "WORDLIST" }, // A special tag to track the entire list
            ]
          : [{ type: "Word", id: "WORDLIST" }],
    }),
    addWord: builder.mutation({
      query: (word) => ({
        url: "/admin/words",
        method: "POST",
        body: { word },
      }),
      invalidatesTags: (result, error, { id }) => {
        return [{ type: "Word", id: "WORDLIST" }];
      },
    }),
    editWord: builder.mutation({
      query: (word) => ({
        url: "/admin/words",
        method: "PATCH",
        body: { word },
      }),
      invalidatesTags: (result, error, { id }) => {
        return [{ type: "Word", id }];
      },
    }),
    removeWord: builder.mutation({
      query: (id) => ({
        url: "/admin/words",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Word", id }],
    }),
    getLessonWords: builder.query<Word[], string>({
      query: (lessonID) => ({
        url: "/admin/words/lesson",
        method: "GET",
        params: { lessonID },
      }),
      // transformResponse: (response: any) => {
      //   console.log(response);
      //   return response;
      // },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Word" as const, id })), // Provide tags for each todo
              { type: "Word", id: "WORDLESSON" }, // A special tag to track the entire list
            ]
          : [{ type: "Word", id: "WORDLESSON" }],
    }),
  }),
});

export const {
  useLazyGetWordsQuery,
  useLazyGetLessonWordsQuery,
  useAddWordMutation,
  useEditWordMutation,
  useRemoveWordMutation,
} = wordsSlice;

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

export const selectSectionWords = (lessonID: string, sectionID: string) =>
  createSelector(
    wordsSlice.endpoints.getLessonWords.select(lessonID),
    (result) => {
      // console.log(result);
      return result?.data
        ? result?.data.filter((item) => item.sectionID === sectionID)
        : [];
    }
  );
