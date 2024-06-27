import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

// TODO: change compare value to date or sort option
const wordsAdapter = createEntityAdapter({
  selectId: (word) => word.id,
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex.toString().localeCompare(b.sortIndex.toString());
    } else {
      return a.blockID.localeCompare(b.blockID);
    }
  },
});

const initialState = wordsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWords: builder.query({
      query: (lessonID = "lesson") => ({
        url: SERVER.WORD,
        method: "GET",
        params: { lessonID },
      }),
      transformResponse: (responseData) => {
        return wordsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Word", id: "Word" },
        ...result.ids.map((id) => ({ type: "Word", id })),
      ],
    }),
    addWord: builder.mutation({
      query: (word) => ({
        url: SERVER.WORD,
        method: "POST",
        body: {
          payload: word,
        },
      }),
      invalidatesTags: [{ type: "Word", id: "Word" }],
    }),
    editWord: builder.mutation({
      query: (word) => ({
        url: SERVER.WORD,
        method: "PATCH",
        body: {
          action: {
            type: ACTIONS.EDIT_WORD_CONTENT,
            payload: word,
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
    }),
    editWordDetails: builder.mutation({
      query: (word) => ({
        url: SERVER.WORD,
        method: "PATCH",
        body: {
          action: {
            type: ACTIONS.EDIT_WORD_DETAILS,
            payload: { word },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
    }),
    editWordBlockID: builder.mutation({
      query: (word) => ({
        url: SERVER.WORD,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_WORD_LESSONID,
            payload: { userName: store.getState()?.auth?.user, word },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
    }),
    editWordSectionID: builder.mutation({
      query: (word) => ({
        url: SERVER.WORD,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_WORD_SECTIONID,
            payload: { userName: store.getState()?.auth?.user, word },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
    }),
    editWordExercise: builder.mutation({
      query: (word) => ({
        url: SERVER.WORD,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_WORD_DETAILS,
            payload: { userName: store.getState()?.auth?.user, word },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
    }),
    removeWord: builder.mutation({
      query: (id) => ({
        url: SERVER.WORD,
        method: "DELETE",
        body: {
          payload: id,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
    }),
    addWordSentence: builder.mutation({
      query: (sentenceData) => ({
        url: SERVER.WORD_SENTENCES,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_SENTENCE,
            payload: { userName: store.getState()?.auth?.user, sentenceData },
          },
        },
      }),
      invalidatesTags: [{ type: "Word", id: "Word" }],
    }),
    editWordSentence: builder.mutation({
      query: (sentenceData) => ({
        url: SERVER.WORD_SENTENCES,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_SENTENCE,
            payload: { userName: store.getState()?.auth?.user, sentenceData },
          },
        },
      }),
      invalidatesTags: [{ type: "Word", id: "Word" }],
    }),
    deleteWordSentence: builder.mutation({
      query: (sentenceData) => ({
        url: SERVER.WORD_SENTENCES,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.DELETE_SENTENCE,
            payload: { userName: store.getState()?.auth?.user, sentenceData },
          },
        },
      }),
      invalidatesTags: [{ type: "Word", id: "Word" }],
    }),
  }),
});

export const {
  useGetWordsQuery,
  useAddWordMutation,
  useEditWordMutation,
  useEditWordDetailsMutation,
  useEditWordBlockIDMutation,
  useEditWordSectionIDMutation,
  useEditWordExerciseMutation,
  useAddWordSentenceMutation,
  useEditWordSentenceMutation,
  useDeleteWordSentenceMutation,
  useRemoveWordMutation,
} = extendedApiSlice;

// returns the query result object
export const selectWordsResult = extendedApiSlice.endpoints.getWords.select();

// Creates memoized selector
const selectWordsData = createSelector(
  selectWordsResult,
  (wordResult) => wordResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllWords,
  // Pass in a selector that returns the posts slice of state
} = wordsAdapter.getSelectors(
  (state) => selectWordsData(state) ?? initialState
);
