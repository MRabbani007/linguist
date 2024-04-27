import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

// TODO: change compare value to date or sort option
const wordsAdapter = createEntityAdapter({
  selectId: (word) => word.id,
  sortComparer: (a, b) => a.blockID.localeCompare(b.blockID),
});

const initialState = wordsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWords: builder.query({
      query: (blockID) => ({
        url: SERVER.GET_WORD,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.GET_WORD,
            payload: {
              userName: store.getState()?.auth?.user,
              blockID,
            },
          },
        },
      }),
      transformResponse: (responseData) => {
        return wordsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Word", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Word", id })),
      ],
    }),
    addWord: builder.mutation({
      query: (word) => ({
        url: SERVER.ADD_WORD,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_WORD,
            payload: { userName: store.getState()?.auth?.user, word }, // auth?.user
          },
        },
      }),
      invalidatesTags: [{ type: "Word", id: "LIST" }],
    }),
    editWord: builder.mutation({
      query: (word) => ({
        url: SERVER.EDIT_WORD,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_WORD,
            payload: { userName: store.getState()?.auth?.user, word }, //auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
    }),
    editWordDetails: builder.mutation({
      query: (word) => ({
        url: SERVER.EDIT_WORD_DETAILS,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_WORD_DETAILS,
            payload: { userName: store.getState()?.auth?.user, word }, //auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
    }),
    editWordBlockID: builder.mutation({
      query: (word) => ({
        url: SERVER.EDIT_WORD_BLOCKID,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_WORD_BLOCKID,
            payload: { userName: store.getState()?.auth?.user, word }, //auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
    }),
    editWordSectionID: builder.mutation({
      query: (word) => ({
        url: SERVER.EDIT_WORD_SECTIONID,
        method: "POST",
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
    addWordSentence: builder.mutation({
      query: (sentenceData) => ({
        url: SERVER.ADD_SENTENCE,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_SENTENCE,
            payload: { userName: store.getState()?.auth?.user, sentenceData }, // auth?.user
          },
        },
      }),
      invalidatesTags: [{ type: "Word", id: "LIST" }],
    }),
    editWordSentence: builder.mutation({
      query: (sentenceData) => ({
        url: SERVER.EDIT_SENTENCE,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_SENTENCE,
            payload: { userName: store.getState()?.auth?.user, sentenceData }, // auth?.user
          },
        },
      }),
      invalidatesTags: [{ type: "Word", id: "LIST" }],
    }),
    deleteWordSentence: builder.mutation({
      query: (sentenceData) => ({
        url: SERVER.DELETE_SENTENCE,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.DELETE_SENTENCE,
            payload: { userName: store.getState()?.auth?.user, sentenceData }, // auth?.user
          },
        },
      }),
      invalidatesTags: [{ type: "Word", id: "LIST" }],
    }),
    removeWord: builder.mutation({
      query: (id) => ({
        url: SERVER.REMOVE_WORD,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.REMOVE_WORD,
            payload: { userName: store.getState()?.auth?.user, id }, // auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Word", id: arg.id }],
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
