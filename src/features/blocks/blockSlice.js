import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const blocksAdapter = createEntityAdapter({
  // select id if id is not default entity.id
  // selectId: (block) => block.id,
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    if (a.lessonNo && b.lessonNo) {
      return a.lessonNo.toString().localeCompare(b.lessonNo.toString());
    } else {
      return a.title.localeCompare(b.title);
    }
  },
});

const initialState = blocksAdapter.getInitialState();

export const blocksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlocks: builder.query({
      query: (chapterID = "") => ({
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
      query: () => ({
        url: SERVER.EDITOR_GET_BLOCKS,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDITOR_GET_BLOCKS,
            payload: { userName: store.getState()?.auth?.user }, // auth?.user
          },
        },
      }),
      transformResponse: (responseData) => {
        return blocksAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Block", id: "LIST" },
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
      invalidatesTags: [{ type: "Block", id: "LIST" }],
    }),
    editBlockHeader: builder.mutation({
      query: (lesson) => ({
        url: SERVER.LESSON,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_LESSON_HEADER,
            payload: { userName: store.getState()?.auth?.user, lesson },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    editBlockDetails: builder.mutation({
      query: (lesson) => ({
        url: SERVER.LESSON,
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_LESSON_DETAILS,
            payload: { userName: store.getState()?.auth?.user, lesson },
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    removeBlock: builder.mutation({
      query: (id) => ({
        url: SERVER.LESSON,
        method: "POST",
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
        url: SERVER.ADD_INTRO,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_INTRO,
            payload: { userName: store.getState()?.auth?.user, introData },
          },
        },
      }),
      invalidatesTags: [{ type: "Block", id: "LIST" }],
    }),
    editBlockIntro: builder.mutation({
      query: (introData) => ({
        url: SERVER.EDIT_INTRO,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_INTRO,
            payload: { userName: store.getState()?.auth?.user, introData },
          },
        },
      }),
      invalidatesTags: [{ type: "Block", id: "LIST" }],
    }),
    deleteBlockIntro: builder.mutation({
      query: (introData) => ({
        url: SERVER.DELETE_INTRO,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.DELETE_INTRO,
            payload: { userName: store.getState()?.auth?.user, introData },
          },
        },
      }),
      invalidatesTags: [{ type: "Block", id: "LIST" }],
    }),
  }),
});

export const {
  useGetBlocksQuery,
  useGetAllBlocksQuery,
  useLazyGetBlocksQuery,
  useAddBlockMutation,
  useEditBlockHeaderMutation,
  useEditBlockDetailsMutation,
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
