import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

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

type LessonResponse = { count: number; data: Lesson[] };
type LessonReq = { page: String; chapter: String };

export const lessonsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // for chapter page
    getChapterLessons: builder.query<Lesson[], string>({
      query: (chapterID = "Chapter") => ({
        url: SERVER.LESSON,
        method: "GET",
        params: { chapterID },
      }),
      // transformResponse: (responseData) => {
      //   return lessonsAdapter.setAll(initialState, responseData);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Block", id: "BLOCK" },
      //   ...result.ids.map((id) => ({ type: "Block", id })),
      // ],
    }),
    // for admin
    getAdminLessons: builder.query<LessonResponse, LessonReq>({
      query: ({ page, chapter }) => ({
        url: "/admin/lessons",
        method: "GET",
        params: { page, chapter },
      }),
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
        url: SERVER.LESSON,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_LESSON,
            payload: { userName: store.getState()?.auth?.user, lesson },
          },
        },
      }),
      // invalidatesTags: [{ type: "Block", id: "BLOCK" }],
    }),
    editLesson: builder.mutation({
      query: (lesson) => ({
        url: SERVER.LESSON,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: { lesson },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: SERVER.LESSON,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.DELETE_LESSON,
            payload: { userName: store.getState()?.auth?.user, id },
          },
        },
      }),
      // invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChapterLessonsQuery,
  useLazyGetChapterLessonsQuery,
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
