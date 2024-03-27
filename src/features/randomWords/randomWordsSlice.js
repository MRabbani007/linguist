import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const randomWordsAdapter = createEntityAdapter({
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => a.first.localeCompare(b.first),
});

const initialState = randomWordsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRandomWords: builder.query({
      query: () => ({
        url: SERVER.GET_WORD_RANDOM,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.GET_WORD_RANDOM,
            payload: { userName: store.getState()?.auth?.user }, // auth?.user
          },
        },
      }),
      transformResponse: (responseData) => {
        return randomWordsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "RandomWords", id: "LIST" },
        ...result.ids.map((id) => ({ type: "RandomWords", id })),
      ],
    }),
  }),
});

export const { useGetRandomWordsQuery, useLazyGetRandomWordsQuery } =
  extendedApiSlice;

// returns the query result object
export const selectRandomWordsResult =
  extendedApiSlice.endpoints.getRandomWords.select();

// Creates memoized selector
const selectRandomWordsData = createSelector(
  selectRandomWordsResult,
  (randomWordsResult) => randomWordsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllRandomWords,
  // Pass in a selector that returns the posts slice of state
} = randomWordsAdapter.getSelectors(
  (state) => selectRandomWordsData(state) ?? initialState
);
