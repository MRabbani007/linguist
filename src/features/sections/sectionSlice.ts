// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// const sectionsAdapter = createEntityAdapter({
//   // TODO: change compare value to date or sort option
//   // sortComparer: (a, b) => {
//   //   if (a.sortIndex && b.sortIndex) {
//   //     return a.sortIndex.toString().localeCompare(b.sortIndex.toString());
//   //   } else {
//   //     return a.title.localeCompare(b.title);
//   //   }
//   // },
// });

// const initialState = sectionsAdapter.getInitialState();

type QueryParams = { lessonID: string; page: number };

export const sectionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSections: builder.query<QueryResponse<Section>, QueryParams>({
      query: ({ lessonID = "lesson", page = 1 }) => ({
        url: "/admin/sections",
        method: "GET",
        params: { lessonID, page },
      }),
      providesTags: ["Section"],
      // transformResponse: (responseData) => {
      //   store.dispatch(setSections(responseData));
      //   return sectionsAdapter.setAll(initialState, responseData);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Section", id: "LIST" },
      //   ...result?.ids.map((id) => ({ type: "Section", id })),
      // ],
    }),
    addSection: builder.mutation({
      query: (section) => ({
        url: "/admin/sections",
        method: "POST",
        body: { section },
      }),
      invalidatesTags: ["Section"],
    }),
    editSectionHeader: builder.mutation({
      query: (section) => ({
        url: "/admin/sections",
        method: "PATCH",
        body: { section },
      }),
      invalidatesTags: ["Section"],
      // invalidatesTags: (result, error, arg) => [
      //   { type: "Section", id: arg.id },
      // ],
    }),
    editSectionLessonID: builder.mutation({
      query: (section) => ({
        url: "/admin/sections",
        method: "PATCH",
        body: { section },
      }),
      invalidatesTags: ["Section"],
      // invalidatesTags: (result, error, arg) => [
      //   { type: "Section", id: arg.id },
      // ],
    }),
    removeSection: builder.mutation({
      query: (id) => ({
        url: "/admin/sections",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Section"],
      // invalidatesTags: (result, error, arg) => [
      //   { type: "Section", id: arg.id },
      // ],
    }),
    // addSectionIntro: builder.mutation({
    //   query: (introData) => ({
    //     url: SERVER.SECTION_INTRO,
    //     method: "POST",
    //     body: {
    //       roles: store.getState()?.auth?.roles,
    //       action: {
    //         type: ACTIONS.SECTION_ADD_INTRO,
    //         payload: { userName: store.getState()?.auth?.user, introData },
    //       },
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Section", id: "LIST" }],
    // }),
    // editSectionIntro: builder.mutation({
    //   query: (introData) => ({
    //     url: SERVER.SECTION_INTRO,
    //     method: "PATCH",
    //     body: {
    //       roles: store.getState()?.auth?.roles,
    //       action: {
    //         type: ACTIONS.SECTION_EDIT_INTRO,
    //         payload: { userName: store.getState()?.auth?.user, introData },
    //       },
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Section", id: "LIST" }],
    // }),
    // deleteSectionIntro: builder.mutation({
    //   query: (introData) => ({
    //     url: SERVER.SECTION_INTRO,
    //     method: "DELETE",
    //     body: {
    //       roles: store.getState()?.auth?.roles,
    //       action: {
    //         type: ACTIONS.SECTION_DELETE_INTRO,
    //         payload: { userName: store.getState()?.auth?.user, introData },
    //       },
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Section", id: "LIST" }],
    // }),
  }),
});

export const {
  useLazyGetAdminSectionsQuery,
  useAddSectionMutation,
  useEditSectionHeaderMutation,
  useEditSectionLessonIDMutation,
  useRemoveSectionMutation,
  // useAddSectionIntroMutation,
  // useEditSectionIntroMutation,
  // useDeleteSectionIntroMutation,
} = sectionsApiSlice;

// returns the query result object
// export const selectSectionsResult =
//   sectionsApiSlice.endpoints.getSections.select();

// Creates memoized selector
// const selectSectionsData = createSelector(
//   selectSectionsResult,
//   (sectionResult) => sectionResult.data // normalized state object with ids & entities
// );

//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllSections,
//   // Pass in a selector that returns the posts slice of state
// } = sectionsAdapter.getSelectors((state) => {
//   return selectSectionsData(state) ?? initialState;
// });
