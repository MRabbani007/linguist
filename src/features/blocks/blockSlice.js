import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";
import { setLessons } from "../globals/globalsSlice";

const blocksAdapter = createEntityAdapter({
  // select id if id is not default entity.id
  // selectId: (block) => block.id,
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    if (a.sortIndex && b.sortIndex) {
      return a.sortIndex > b.sortIndex ? 1 : -1;
    } else if (a.lessonNo && b.lessonNo) {
      return a.lessonNo > b.lessonNo ? 1 : -1;
    } else {
      return a.title.localeCompare(b.title);
    }
  },
});

const initialState = blocksAdapter.getInitialState();

export const blocksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlocks: builder.query({
      query: (chapterID = "Chapter") => ({
        url: SERVER.LESSON,
        method: "GET",
        params: { chapterID },
      }),
      transformResponse: (responseData) => {
        return blocksAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Block", id: "BLOCK" },
        ...result.ids.map((id) => ({ type: "Block", id })),
      ],
    }),
    getAllBlocks: builder.query({
      query: (langID = "lang") => ({
        url: "/block/getall",
        method: "GET",
        params: { langID },
      }),
      transformResponse: (responseData) => {
        return blocksAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Block", id: "BLOCK" },
        ...result.ids.map((id) => ({ type: "Block", id })),
      ],
    }),
    addBlock: builder.mutation({
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
      invalidatesTags: [{ type: "Block", id: "BLOCK" }],
    }),
    editBlockHeader: builder.mutation({
      query: (lesson) => ({
        url: SERVER.LESSON,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: { lesson },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    editLesson: builder.mutation({
      query: ({ type, payload }) => ({
        url: SERVER.LESSON,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          action: { type, payload },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    removeBlock: builder.mutation({
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
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    addBlockIntro: builder.mutation({
      query: (introData) => ({
        url: SERVER.LESSON_INTRO,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.LESSON_ADD_INTRO,
            payload: { userName: store.getState()?.auth?.user, introData },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    editBlockIntro: builder.mutation({
      query: (introData) => ({
        url: SERVER.LESSON_INTRO,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.LESSON_EDIT_INTRO,
            payload: { userName: store.getState()?.auth?.user, introData },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    deleteBlockIntro: builder.mutation({
      query: (introData) => ({
        url: SERVER.LESSON_INTRO,
        method: "DELETE",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.LESSON_DELETE_INTRO,
            payload: { userName: store.getState()?.auth?.user, introData },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
  }),
});

export const {
  useGetBlocksQuery,
  useLazyGetBlocksQuery,
  useGetAllBlocksQuery,
  useLazyGetAllBlocksQuery,
  useAddBlockMutation,
  useEditBlockHeaderMutation,
  useEditLessonMutation,
  useRemoveBlockMutation,
  useAddBlockIntroMutation,
  useEditBlockIntroMutation,
  useDeleteBlockIntroMutation,
} = blocksApiSlice;

// returns the query result object
export const selectBlocksResult = blocksApiSlice.endpoints.getBlocks.select();

// Creates memoized selector
const selectBlocksData = createSelector(
  selectBlocksResult,
  (blockResult) => blockResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllBlocks,
  // selectById: selectBlocksByChapterID,
  // selectIds: selectBlockByBlockID,
  // Pass in a selector that returns the posts slice of state
} = blocksAdapter.getSelectors((state) => {
  // console.log(selectBlocksData(state));
  return selectBlocksData(state) ?? initialState;
});
