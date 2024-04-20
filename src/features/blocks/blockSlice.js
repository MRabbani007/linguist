import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const blocksAdapter = createEntityAdapter({
  // select id if id is not default entity.id
  // selectId: (block) => block.id,
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = blocksAdapter.getInitialState();

export const blocksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlocks: builder.query({
      query: (chapterID) => ({
        url: SERVER.GET_BLOCK,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.GET_BLOCK,
            payload: { userName: store.getState()?.auth?.user, chapterID },
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
      query: (block) => ({
        url: SERVER.ADD_BLOCK,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.ADD_BLOCK,
            payload: { userName: store.getState()?.auth?.user, block }, // auth?.user
          },
        },
      }),
      // transformResponse: (responseData) => {
      //   console.log(responseData);
      //   return blocksAdapter.setAll(initialState, responseData.data);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Block", id: "LIST" },
      //   ...result.ids.map((id) => ({ type: "Block", id })),
      // ],
      invalidatesTags: [{ type: "Block", id: "LIST" }],
    }),
    editBlockHeader: builder.mutation({
      query: (block) => ({
        url: SERVER.EDIT_BLOCK_HEADER,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_BLOCK_HEADER,
            payload: { userName: store.getState()?.auth?.user, block }, //auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    editBlockDetails: builder.mutation({
      query: (block) => ({
        url: SERVER.EDIT_BLOCK_DETAILS,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_BLOCK_DETAILS,
            payload: { userName: store.getState()?.auth?.user, block }, //auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    editBlockContent: builder.mutation({
      query: (block) => ({
        url: SERVER.EDIT_BLOCK_CONTENT,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.EDIT_BLOCK_CONTENT,
            payload: { userName: store.getState()?.auth?.user, block }, //auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
    }),
    removeBlock: builder.mutation({
      query: (id) => ({
        url: SERVER.REMOVE_BLOCK,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: ACTIONS.REMOVE_BLOCK,
            payload: { userName: store.getState()?.auth?.user, id }, // auth?.user
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Block", id: arg.id }],
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
  useEditBlockContentMutation,
  useRemoveBlockMutation,
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
