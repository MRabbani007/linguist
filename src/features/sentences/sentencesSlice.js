import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";
import { setSentenceSearchCount } from "../globals/globalsSlice";

const sentencesAdapter = createEntityAdapter({
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex > b.sortIndex ? 1 : -1;
    } else {
      return (a?.translation || "").localeCompare(b?.translation || "");
    }
  },
});

const initialState = sentencesAdapter.getInitialState();

export const sentencesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSentences: builder.query({
      query: (lessonID = "lesson") => ({
        url: SERVER.SENTENCE,
        method: "GET",
        params: { lessonID },
      }),
      transformResponse: (responseData) => {
        return sentencesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Sentence", id: "Sentence" },
        ...result.ids.map((id) => ({ type: "Sentence", id })),
      ],
    }),
    getSentencesAll: builder.query({
      query: ({ searchTerm = "", lessonID = "", page }) => ({
        url: "/sentences",
        method: "GET",
        params: { searchTerm, lessonID, page },
      }),
      transformResponse: (responseData) => {
        store.dispatch(setSentenceSearchCount(responseData.count));
        return sentencesAdapter.setAll(initialState, responseData.data);
      },
      providesTags: (result, error, arg) => [
        { type: "Sentence", id: "Sentence" },
        ...result.ids.map((id) => ({ type: "Sentence", id })),
      ],
    }),
    addSentence: builder.mutation({
      query: (sentence) => ({
        url: SERVER.SENTENCE,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: "ADD_SENTENCE",
            payload: { userName: store.getState()?.auth?.user, sentence },
          },
        },
      }),
      invalidatesTags: [{ type: "Sentence", id: "Sentence" }],
    }),
    editSentence: builder.mutation({
      query: ({ sentence, type }) => ({
        url: SERVER.SENTENCE,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: type,
            payload: { userName: store.getState()?.auth?.user, sentence },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Sentence", id: arg.id },
      ],
    }),
    removeSentence: builder.mutation({
      query: (id) => ({
        url: SERVER.SENTENCE,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: "DELETE_SENTENCE",
            payload: { userName: store.getState()?.auth?.user, id },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Sentence", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetSentencesQuery,
  useLazyGetSentencesQuery,
  useLazyGetSentencesAllQuery,
  useAddSentenceMutation,
  useEditSentenceMutation,
  useRemoveSentenceMutation,
} = sentencesApiSlice;

// returns the query result object
export const selectSentencesResult =
  sentencesApiSlice.endpoints.getSentences.select();

// Creates memoized selector
const selectSentencesData = createSelector(
  selectSentencesResult,
  (sentenceResult) => sentenceResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllChapters,
  // Pass in a selector that returns the posts slice of state
} = sentencesAdapter.getSelectors((state) => {
  return selectSentencesData(state) ?? initialState;
});
