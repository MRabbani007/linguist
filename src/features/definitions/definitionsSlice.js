import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const definitionsAdapter = createEntityAdapter({
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex.toString().localeCompare(b.sortIndex.toString());
    } else {
      return a.createDate.localeCompare(b.createDate);
    }
  },
});

const initialState = definitionsAdapter.getInitialState();

export const definitionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDefinitions: builder.query({
      query: (lessonID = "lessonID") => ({
        url: SERVER.DEFINITION,
        method: "GET",
        params: { lessonID },
      }),
      transformResponse: (responseData) => {
        return definitionsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Definition", id: "DEFINITION" },
        ...result.ids.map((id) => ({ type: "Definition", id })),
      ],
    }),
    getAllDefinitions: builder.query({
      query: () => ({
        url: "/block/definitionsAll",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        return definitionsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Definition", id: "DEFINITION" },
        ...result.ids.map((id) => ({ type: "Definition", id })),
      ],
    }),
    addDefinition: builder.mutation({
      query: (definition) => ({
        url: SERVER.DEFINITION,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_DEFINITION,
            payload: { userName: store.getState()?.auth?.user, definition },
          },
        },
      }),
      invalidatesTags: [{ type: "Definition", id: "DEFINITION" }],
    }),
    editDefinitionConent: builder.mutation({
      query: (definition) => ({
        url: SERVER.DEFINITION,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_DEFINITION_CONTENT,
            payload: { userName: store.getState()?.auth?.user, definition },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Definition", id: arg.id },
      ],
    }),
    editDefinitionLessonID: builder.mutation({
      query: (definition) => ({
        url: SERVER.DEFINITION,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_DEFINITION_LESSONID,
            payload: { userName: store.getState()?.auth?.user, definition },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Definition", id: arg.id },
      ],
    }),
    removeDefinition: builder.mutation({
      query: (id) => ({
        url: SERVER.DEFINITION,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.REMOVE_DEFINITION,
            payload: { userName: store.getState()?.auth?.user, id },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Definition", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetDefinitionsQuery,
  useAddDefinitionMutation,
  useEditDefinitionConentMutation,
  useEditDefinitionLessonIDMutation,
  useRemoveDefinitionMutation,
  useGetAllDefinitionsQuery,
} = definitionsApiSlice;

// returns the query result object
export const selectDefinitionsResult =
  definitionsApiSlice.endpoints.getDefinitions.select();

// Creates memoized selector
const selectDefinitionsData = createSelector(
  selectDefinitionsResult,
  (definitionsResult) => definitionsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllDefinitions,
  // Pass in a selector that returns the posts slice of state
} = definitionsAdapter.getSelectors((state) => {
  return selectDefinitionsData(state) ?? initialState;
});
