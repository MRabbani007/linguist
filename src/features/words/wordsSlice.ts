import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const wordsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // use for admin words page
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
      providesTags: (result) => {
        return result
          ? [
              ...result?.data.map(({ id }) => ({ type: "Word" as const, id })), // Provide tags for each todo
              { type: "Word", id: "WORDLIST" }, // A special tag to track the entire list
            ]
          : [{ type: "Word", id: "WORDLIST" }];
      },
    }),
    // used for lesson editor
    getLessonWords: builder.query<Word[], string>({
      query: (lessonID) => ({
        url: "/admin/words/lesson",
        method: "GET",
        params: { lessonID },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Word" as const, id })), // Provide tags for each todo
              { type: "Word", id: "WORDLESSON" }, // A special tag to track the entire list
            ]
          : [{ type: "Word", id: "WORDLESSON" }],
    }),
    addWord: builder.mutation({
      query: (word) => ({
        url: "/admin/words",
        method: "POST",
        body: { word },
      }),
      invalidatesTags: () => {
        return [
          { type: "Word", id: "WORDLIST" },
          { type: "Word", id: "WORDLESSON" },
        ];
      },
    }),
    editWord: builder.mutation({
      query: (word) => ({
        url: "/admin/words",
        method: "PATCH",
        body: { word },
      }),
      invalidatesTags: (_, __, { id }) => {
        return [{ type: "Word", id }];
      },
    }),
    editWordExamples: builder.mutation({
      query: (word) => ({
        url: "/admin/words/examples",
        method: "PATCH",
        body: { word },
      }),
      invalidatesTags: (_, __, { id }) => {
        return [{ type: "Word", id }];
      },
    }),
    removeWord: builder.mutation({
      query: (id) => ({
        url: "/admin/words",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Word", id }],
    }),
    sortWords: builder.mutation({
      query: ({ words }: { words: { id: string; sortIndex: number }[] }) => ({
        url: "/admin/words/bulk/sort",
        method: "PATCH",
        body: { words },
      }),
      invalidatesTags: [{ type: "Word", id: "WORDLIST" }],
    }),
  }),
});

export const {
  useGetWordsQuery,
  useLazyGetWordsQuery,
  useLazyGetLessonWordsQuery,
  useAddWordMutation,
  useEditWordMutation,
  useEditWordExamplesMutation,
  useRemoveWordMutation,
  useSortWordsMutation,
} = wordsSlice;

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
