import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const chaptersAdapter = createEntityAdapter({
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    if (a.chapterNo && b.chapterNo) {
      return a.chapterNo.toString().localeCompare(b.chapterNo.toString());
    } else {
      return a.title.localeCompare(b.title);
    }
  },
});

const initialState = chaptersAdapter.getInitialState();

export const chaptersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: (langID = "lang") => ({
        url: SERVER.CHAPTER,
        method: "GET",
        params: { langID },
      }),
      transformResponse: (responseData) => {
        // store.dispatch(setChapters(responseData));
        return chaptersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Chapter", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Chapter", id })),
      ],
    }),
    addChapter: builder.mutation({
      query: (chapter) => ({
        url: SERVER.CHAPTER,
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
        url: SERVER.CHAPTER,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_CHAPTER,
            payload: { userName: store.getState()?.auth?.user, chapter },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Chapter", id: arg.id },
      ],
    }),
    removeChapter: builder.mutation({
      query: (id) => ({
        url: SERVER.CHAPTER,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.REMOVE_CHAPTER,
            payload: { userName: store.getState()?.auth?.user, id },
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
  useLazyGetChaptersQuery,
  useAddChapterMutation,
  useEditChapterMutation,
  useRemoveChapterMutation,
} = chaptersApiSlice;

// returns the query result object
export const selectChaptersResult =
  chaptersApiSlice.endpoints.getChapters.select();

// Creates memoized selector
const selectChaptersData = createSelector(
  selectChaptersResult,
  (chapterResult) => chapterResult.data // normalized state object with ids & entities
);

// const chapterSelectors = chaptersAdapter.getSelectors((state) => state.data);
// const allChapters = chapterSelectors.selectAll(store.getState());

// console.log(allChapters);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllChapters,
  // Pass in a selector that returns the posts slice of state
} = chaptersAdapter.getSelectors((state) => {
  // console.log(selectChaptersData(state));
  return selectChaptersData(state) ?? initialState;
});
