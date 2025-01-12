import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const lessonsAdapter = createEntityAdapter<Lesson>({
  // select id if id is not default entity.id
  // selectId: (block) => block.id,
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex > b.sortIndex ? 1 : -1;
    } else if (a.lessonNo && b.lessonNo) {
      return a.lessonNo > b.lessonNo ? 1 : -1;
    }
    return 1;
  },
});

const initialState = lessonsAdapter.getInitialState();

type LessonReq = { page: String; chapter: String };

export const lessonsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // for admin
    getAdminLessons: builder.query<QueryResponse<Lesson>, LessonReq>({
      query: ({ page, chapter }) => ({
        url: "/admin/lessons",
        method: "GET",
        params: { page, chapter },
      }),
      providesTags: ["Lesson"],
      // transformResponse: (responseData) => {
      //   return blocksAdapter.setAll(initialState, responseData);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Block", id: "BLOCK" },
      //   ...result.ids.map((id) => ({ type: "Block", id })),
      // ],
    }),
    addLesson: builder.mutation({
      query: (lesson) => ({
        url: "/admin/lessons",
        method: "POST",
        body: { lesson },
      }),
      invalidatesTags: ["Lesson"],
    }),
    editLesson: builder.mutation({
      query: (lesson) => ({
        url: "/admin/lessons",
        method: "PATCH",
        // headers: {
        //   Authorization: `Bearer ${store.getState()?.auth?.token}`,
        // },
        body: { lesson },
      }),
      invalidatesTags: ["Lesson"],
      // invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: "/admin/lessons",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Lesson"],
      // invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetAdminLessonsQuery,
  useAddLessonMutation,
  useEditLessonMutation,
  useDeleteLessonMutation,
} = lessonsApiSlice;

// returns the query result object
// export const selectBlocksResult = blocksApiSlice.endpoints.getBlocks.select();

// Creates memoized selector
// const selectBlocksData = createSelector(
//   selectBlocksResult,
//   (blockResult) => blockResult.data // normalized state object with ids & entities
// );

//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllBlocks,
//   // selectById: selectBlocksByChapterID,
//   // selectIds: selectBlockByBlockID,
//   // Pass in a selector that returns the posts slice of state
// } = blocksAdapter.getSelectors((state) => {
//   // console.log(selectBlocksData(state));
//   return selectBlocksData(state) ?? initialState;
// });
