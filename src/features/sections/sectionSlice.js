import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const sectionsAdapter = createEntityAdapter({
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex.toString().localeCompare(b.sortIndex.toString());
    } else {
      return a.title.localeCompare(b.title);
    }
  },
});

const initialState = sectionsAdapter.getInitialState();

export const sectionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query({
      query: (lessonID = "lesson") => ({
        url: SERVER.SECTION,
        method: "GET",
        params: { lessonID },
      }),
      transformResponse: (responseData) => {
        return sectionsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Section", id: "LIST" },
        ...result?.ids.map((id) => ({ type: "Section", id })),
      ],
    }),
    addSection: builder.mutation({
      query: (section) => ({
        url: SERVER.SECTION,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_SECTION,
            payload: { userName: store.getState()?.auth?.user, section },
          },
        },
      }),
      invalidatesTags: [{ type: "Section", id: "LIST" }],
    }),
    editSectionHeader: builder.mutation({
      query: (section) => ({
        url: SERVER.SECTION,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_SECTION_HEADER,
            payload: { userName: store.getState()?.auth?.user, section },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Section", id: arg.id },
      ],
    }),
    editSectionLessonID: builder.mutation({
      query: (section) => ({
        url: SERVER.SECTION,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_SECTION_LESSONID,
            payload: { userName: store.getState()?.auth?.user, section },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Section", id: arg.id },
      ],
    }),
    removeSection: builder.mutation({
      query: (id) => ({
        url: SERVER.SECTION,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.REMOVE_SECTION,
            payload: { userName: store.getState()?.auth?.user, id },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Section", id: arg.id },
      ],
    }),
    addSectionIntro: builder.mutation({
      query: (introData) => ({
        url: SERVER.SECTION_INTRO,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_ADD_INTRO,
            payload: { userName: store.getState()?.auth?.user, introData },
          },
        },
      }),
      invalidatesTags: [{ type: "Section", id: "LIST" }],
    }),
    editSectionIntro: builder.mutation({
      query: (introData) => ({
        url: SERVER.SECTION_INTRO,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_EDIT_INTRO,
            payload: { userName: store.getState()?.auth?.user, introData },
          },
        },
      }),
      invalidatesTags: [{ type: "Section", id: "LIST" }],
    }),
    deleteSectionIntro: builder.mutation({
      query: (introData) => ({
        url: SERVER.SECTION_INTRO,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.SECTION_DELETE_INTRO,
            payload: { userName: store.getState()?.auth?.user, introData },
          },
        },
      }),
      invalidatesTags: [{ type: "Section", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useAddSectionMutation,
  useEditSectionHeaderMutation,
  useEditSectionLessonIDMutation,
  useRemoveSectionMutation,
  useAddSectionIntroMutation,
  useEditSectionIntroMutation,
  useDeleteSectionIntroMutation,
} = sectionsApiSlice;

// returns the query result object
export const selectSectionsResult =
  sectionsApiSlice.endpoints.getSections.select();

// Creates memoized selector
const selectSectionsData = createSelector(
  selectSectionsResult,
  (sectionResult) => sectionResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllSections,
  // Pass in a selector that returns the posts slice of state
} = sectionsAdapter.getSelectors((state) => {
  return selectSectionsData(state) ?? initialState;
});
