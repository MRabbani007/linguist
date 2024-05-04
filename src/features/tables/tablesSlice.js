import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const tablesAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex.toString().localeCompare(b.sortIndex.toString());
    } else {
      return a.createDate.localeCompare(b.createDate);
    }
  },
});

const initialState = tablesAdapter.getInitialState();

export const tablesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query({
      query: (lessonID = "lessonID") => ({
        url: SERVER.TABLE,
        method: "GET",
        params: { lessonID },
      }),
      transformResponse: (responseData) => {
        return tablesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Table", id: "TABLE" },
        ...result.ids.map((id) => ({ type: "Table", id })),
      ],
    }),
    addTable: builder.mutation({
      query: (table) => ({
        url: SERVER.TABLE,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_TABLE,
            payload: { userName: store.getState()?.auth?.user, table },
          },
        },
      }),
      invalidatesTags: () => [{ type: "Table", id: "TABLE" }],
    }),
    // Edit table title, subtitle, notes, sortIndex
    editTableContent: builder.mutation({
      query: (table) => ({
        url: SERVER.TABLE,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_TABLE_CONTENT,
            payload: { userName: store.getState()?.auth?.user, table },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Table", id: arg.id }],
    }),
    // Edit table cols & rows
    editTableHeaders: builder.mutation({
      query: (table) => ({
        url: SERVER.TABLE,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_TABLE_HEADERS,
            payload: { userName: store.getState()?.auth?.user, table },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Table", id: arg.id }],
    }),
    // Move table to section/lesson
    editTableLessonID: builder.mutation({
      query: (table) => ({
        url: SERVER.TABLE,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_TABLE_LESSONID,
            payload: { userName: store.getState()?.auth?.user, table },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Table", id: arg.id }],
    }),
    removeTable: builder.mutation({
      query: (id) => ({
        url: SERVER.TABLE,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.REMOVE_TABLE,
            payload: { userName: store.getState()?.auth?.user, id },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Table", id: arg.id }],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useAddTableMutation,
  useEditTableContentMutation,
  useEditTableHeadersMutation,
  useEditTableLessonIDMutation,
  useRemoveTableMutation,
} = tablesApiSlice;

// returns the query result object
export const selectTablesResult = tablesApiSlice.endpoints.getTables.select();

// Creates memoized selector
const selectTablesData = createSelector(
  selectTablesResult,
  (tablesResult) => {
    return tablesResult.data;
  } // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTables,
  // Pass in a selector that returns the posts slice of state
} = tablesAdapter.getSelectors((state) => {
  return selectTablesData(state) ?? initialState;
});
