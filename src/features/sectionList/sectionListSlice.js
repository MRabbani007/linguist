import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const sectionListsAdapter = createEntityAdapter({
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex.toString().localeCompare(b.sortIndex.toString());
    } else {
      return a.title.localeCompare(b.title);
    }
  },
});

const initialState = sectionListsAdapter.getInitialState();

export const sectionListsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSectionLists: builder.query({
      query: (lessonID = "lesson") => ({
        url: SERVER.SECTION_LIST,
        method: "GET",
        params: { lessonID },
      }),
      transformResponse: (responseData) => {
        return sectionListsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "SectionList", id: "SectionList" },
        ...result.ids.map((id) => ({ type: "SectionList", id })),
      ],
    }),
    addSectionList: builder.mutation({
      query: (sectionList) => ({
        url: SERVER.SECTION_LIST,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_LIST_ADD,
            payload: { userName: store.getState()?.auth?.user, sectionList },
          },
        },
      }),
      invalidatesTags: [{ type: "SectionList", id: "LIST" }],
    }),
    editSectionListContent: builder.mutation({
      query: (sectionList) => ({
        url: SERVER.SECTION_LIST,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_LIST_EDIT_CONTENT,
            payload: { userName: store.getState()?.auth?.user, sectionList },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SectionList", id: arg.id },
      ],
    }),
    editSectionListLessonID: builder.mutation({
      query: (sectionList) => ({
        url: SERVER.SECTION_LIST,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_LIST_EDIT_LESSONID,
            payload: { userName: store.getState()?.auth?.user, sectionList },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SectionList", id: arg.id },
      ],
    }),
    removeSectionList: builder.mutation({
      query: (id) => ({
        url: SERVER.SECTION_LIST,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_LIST_DELETE,
            payload: { userName: store.getState()?.auth?.user, id },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SectionList", id: arg.id },
      ],
    }),
    addSectionListItem: builder.mutation({
      query: (itemData) => ({
        url: SERVER.SECTION_LIST_ITEM,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_LIST_ITEM_ADD,
            payload: { userName: store.getState()?.auth?.user, itemData },
          },
        },
      }),
      invalidatesTags: [{ type: "SectionList", id: "SectionList" }],
    }),
    editSectionListItem: builder.mutation({
      query: (itemData) => ({
        url: SERVER.SECTION_LIST_ITEM,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_LIST_ITEM_EDIT,
            payload: { userName: store.getState()?.auth?.user, itemData },
          },
        },
      }),
      invalidatesTags: [{ type: "SectionList", id: "SectionList" }],
    }),
    deleteSectionListItem: builder.mutation({
      query: (itemData) => ({
        url: SERVER.SECTION_LIST_ITEM,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_LIST_ITEM_DELETE,
            payload: { userName: store.getState()?.auth?.user, itemData },
          },
        },
      }),
      invalidatesTags: [{ type: "SectionList", id: "SectionList" }],
    }),
  }),
});

export const {
  useGetSectionListsQuery,
  useAddSectionListMutation,
  useEditSectionListContentMutation,
  useEditSectionListLessonIDMutation,
  useRemoveSectionListMutation,
  useAddSectionListItemMutation,
  useEditSectionListItemMutation,
  useDeleteSectionListItemMutation,
} = sectionListsApiSlice;

// returns the query result object
export const selectSectionListsResult =
  sectionListsApiSlice.endpoints.getSectionLists.select();

// Creates memoized selector
const selectSectionListsData = createSelector(
  selectSectionListsResult,
  (sectionListResult) => sectionListResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllSectionLists,
  // Pass in a selector that returns the posts slice of state
} = sectionListsAdapter.getSelectors((state) => {
  return selectSectionListsData(state) ?? initialState;
});
