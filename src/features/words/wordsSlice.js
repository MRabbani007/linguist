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
  useRemoveWordMutation,
} = extendedApiSlice;

// returns the query result object
export const selectWordsResult = extendedApiSlice.endpoints.getWords.select();

// Creates memoized selector
const selectChaptersData = createSelector(
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
