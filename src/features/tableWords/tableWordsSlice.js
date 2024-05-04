import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const tableWordsAdapter = createEntityAdapter({
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex.toString().localeCompare(b.sortIndex.toString());
    } else {
      return a.createDate.localeCompare(b.createDate);
    }
  },
});

const initialState = tableWordsAdapter.getInitialState();

export const tableWordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTableWords: builder.query({
      query: (lessonID = "lessonID") => ({
        url: SERVER.TABLE_WORD,
        method: "GET",
        params: { lessonID },
      }),
      transformResponse: (responseData) => {
        return tableWordsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "TableWord", id: "TABLEWORD" },
        ...result.ids.map((id) => ({ type: "TableWord", id })),
      ],
    }),
    addTableWord: builder.mutation({
      query: (tableWord) => ({
        url: SERVER.TABLE_WORD,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_TABLEWORD,
            payload: { userName: store.getState()?.auth?.user, tableWord },
          },
        },
      }),
      invalidatesTags: [{ type: "TableWord", id: "TABLEWORD" }],
    }),
    editTableWord: builder.mutation({
      query: (tableWord) => ({
        url: SERVER.TABLE_WORD,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_TABLEWORD,
            payload: { userName: store.getState()?.auth?.user, tableWord },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TableWord", id: arg.id },
      ],
    }),
    removeTableWord: builder.mutation({
      query: (id) => ({
        url: SERVER.TABLE_WORD,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.REMOVE_TABLEWORD,
            payload: { userName: store.getState()?.auth?.user, id },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TableWord", id: arg.id },
      ],
    }),
  }),
});

export const {
  useAddTableWordMutation,
  useGetTableWordsQuery,
  useEditTableWordMutation,
  useRemoveTableWordMutation,
} = tableWordsApiSlice;

// returns the query result object
export const selectTableWordsResult =
  tableWordsApiSlice.endpoints.getTableWords.select();

// Creates memoized selector
const selectTableWordsData = createSelector(
  selectTableWordsResult,
  (tableWordResult) => tableWordResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTableWords,
  // Pass in a selector that returns the posts slice of state
} = tableWordsAdapter.getSelectors((state) => {
  return selectTableWordsData(state) ?? initialState;
});
