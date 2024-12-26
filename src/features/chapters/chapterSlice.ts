import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { store } from "../../app/store";

const chaptersAdapter = createEntityAdapter({
  // TODO: change compare value to date or sort option
  // sortComparer: (a, b) => {
  //   if (a.chapterNo && b.chapterNo) {
  //     return a.chapterNo.toString().localeCompare(b.chapterNo.toString());
  //   } else {
  //     return a.title.localeCompare(b.title);
  //   }
  // },
});

const initialState = chaptersAdapter.getInitialState();

export const chaptersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminChapters: builder.query<QueryResponse<Chapter>, number>({
      query: (page) => ({
        url: "/admin/chapters",
        method: "GET",
        params: { page },
      }),
      providesTags: ["Chapter"], // Mark data for caching
      // transformResponse: (responseData) => {
      //   // store.dispatch(setChapters(responseData));
      //   return chaptersAdapter.setAll(initialState, responseData);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Chapter", id: "LIST" },
      //   ...result.ids.map((id) => ({ type: "Chapter", id })),
      // ],
    }),
    addChapter: builder.mutation({
      query: (chapter) => ({
        url: "/admin/chapters",
        method: "POST",
        body: { chapter },
      }),
      invalidatesTags: ["Chapter"], // Invalidate cache to refetch data
      // invalidatesTags: [{ type: "Chapter", id: "LIST" }],
    }),
    editChapter: builder.mutation({
      query: (chapter) => ({
        url: `/admin/chapters`,
        method: "PATCH",
        body: { chapter },
      }),
      invalidatesTags: ["Chapter"], // Invalidate cache to refetch data
      // invalidatesTags: (result, error, arg) => [
      //   { type: "Chapter", id: arg.id },
      // ],
    }),
    removeChapter: builder.mutation({
      query: (id) => ({
        url: `/admin/chapters`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Chapter"],
      // invalidatesTags: (result, error, arg) => [
      //   { type: "Chapter", id: arg.id },
      // ],
    }),
  }),
});

export const {
  useLazyGetAdminChaptersQuery,
  useAddChapterMutation,
  useEditChapterMutation,
  useRemoveChapterMutation,
} = chaptersApiSlice;

// returns the query result object
// export const selectChaptersResult =
//   chaptersApiSlice.endpoints.getChapters.select();

// Creates memoized selector
// const selectChaptersData = createSelector(
//   selectChaptersResult,
//   (chapterResult) => chapterResult.data // normalized state object with ids & entities
// );

// const chapterSelectors = chaptersAdapter.getSelectors((state) => state.data);
// const allChapters = chapterSelectors.selectAll(store.getState());

// console.log(allChapters);

//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllChapters,
//   // Pass in a selector that returns the posts slice of state
// } = chaptersAdapter.getSelectors((state: RootState) => {
//   // console.log(selectChaptersData(state));
//   return selectChaptersData(state) ?? initialState;
// });
