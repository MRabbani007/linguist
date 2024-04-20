import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const editorAdapter = createEntityAdapter({
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = editorAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: () => ({
        url: SERVER.GET_CHAPTER,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.GET_CHAPTER,
            payload: { userName: store.getState()?.auth?.user }, // auth?.user
          },
        },
      }),
      transformResponse: (responseData) => {
        return chaptersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Chapter", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Chapter", id })),
      ],
    }),
    addChapter: builder.mutation({
      query: (chapter) => ({
        url: SERVER.ADD_CHAPTER,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_CHAPTER,
            payload: { userName: store.getState()?.auth?.user, chapter },
          },
        },
      }),
      invalidatesTags: [{ type: "Chapter", id: "LIST" }],
    }),
    editChapter: builder.mutation({
      query: (chapter) => ({
        url: SERVER.EDIT_CHAPTER,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_CHAPTER,
            payload: { userName: store.getState()?.auth?.user, chapter }, //auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Chapter", id: arg.id },
      ],
    }),
    removeChapter: builder.mutation({
      query: (id) => ({
        url: SERVER.REMOVE_CHAPTER,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.REMOVE_CHAPTER,
            payload: { userName: store.getState()?.auth?.user, id }, // auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Chapter", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useAddChapterMutation,
  useEditChapterMutation,
  useRemoveChapterMutation,
} = extendedApiSlice;

// returns the query result object
export const selectChaptersResult =
  extendedApiSlice.endpoints.getChapters.select();

// Creates memoized selector
const selectChaptersData = createSelector(
  selectChaptersResult,
  (chapterResult) => chapterResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllChapters,
  // Pass in a selector that returns the posts slice of state
} = chaptersAdapter.getSelectors(
  (state) => selectChaptersData(state) ?? initialState
);

// ************************** TODO: REMOVE *******************
