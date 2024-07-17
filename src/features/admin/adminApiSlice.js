import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { store } from "../../app/store";
import {
  setAllCount,
  setChaptersCount,
  setDefinitionsCount,
  setLessonsCount,
  setSectionsCount,
  setWordsCount,
} from "./adminSlice";

const adminAdapter = createEntityAdapter({
  // select id if id is not default entity.id
  selectId: (item) => item?.id,
  // TODO: change compare value to date or sort option
  sortComparer: (a, b) => {
    // if (a?.lessonNo) {
    //   return a.lessonNo > b.lessonNo ? 1 : -1;
    // } else {
    a?.sortIndex > b?.sortIndex ? 1 : -1;
    // }
  },
});

const initialState = adminAdapter.getInitialState();

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllChapters: builder.query({
      query: (page) => ({
        url: "/admin/chapters",
        method: "GET",
        params: { page },
      }),
      transformResponse: (responseData) => {
        store.dispatch(setChaptersCount(responseData?.count));
        return adminAdapter.setAll(initialState, responseData.data);
      },
      providesTags: (result, error, arg) => [
        { type: "Chapter", id: "Chapter" },
        ...result.ids.map((id) => ({ type: "Chapter", id })),
      ],
    }),
    getAllLessons: builder.query({
      query: ({ page, chapter }) => ({
        url: "/admin/lessons",
        method: "GET",
        params: { page, chapter },
      }),
      transformResponse: (responseData) => {
        store.dispatch(setLessonsCount(responseData?.count));
        return adminAdapter.setAll(initialState, responseData?.data);
      },
      providesTags: (result, error, arg) => [
        { type: "Lesson", id: "LESSON" },
        ...result.ids.map((id) => ({ type: "Lesson", id })),
      ],
    }),
    getAllSections: builder.query({
      query: (page) => ({
        url: "/admin/sections",
        method: "GET",
        params: { page },
      }),
      transformResponse: (responseData) => {
        store.dispatch(setSectionsCount(responseData?.count));
        return adminAdapter.setAll(initialState, responseData?.data);
      },
      providesTags: (result, error, arg) => [
        { type: "Section", id: "Section" },
        ...result.ids.map((id) => ({ type: "Section", id })),
      ],
    }),
    getAllDefinitions: builder.query({
      query: (page) => ({
        url: "/admin/definitions",
        method: "GET",
        params: { page },
      }),
      transformResponse: (responseData) => {
        store.dispatch(setDefinitionsCount(responseData?.count));
        return adminAdapter.setAll(initialState, responseData?.data);
      },
      providesTags: (result, error, arg) => [
        { type: "Definition", id: "Definition" },
        ...result.ids.map((id) => ({ type: "Definition", id })),
      ],
    }),
    getAllWords: builder.query({
      query: (page) => ({
        url: "/admin/words",
        method: "GET",
        params: { page },
      }),
      transformResponse: (responseData) => {
        store.dispatch(setWordsCount(responseData?.count));
        return adminAdapter.setAll(initialState, responseData?.data);
      },
      providesTags: (result, error, arg) => [
        { type: "Word", id: "Word" },
        ...result.ids.map((id) => ({ type: "Word", id })),
      ],
    }),
    getAllCount: builder.query({
      query: () => ({
        url: "/admin/count",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        store.dispatch(setAllCount(responseData));
        return adminAdapter.setAll(initialState, [
          {
            id: crypto.randomUUID(),
            responseData,
          },
        ]);
      },
      providesTags: (result, error, arg) => [
        { type: "Count", id: "Count" },
        ...result.ids.map((id) => ({ type: "Count", id })),
      ],
    }),
  }),
});

export const {
  useGetAllCountQuery,
  useLazyGetAllChaptersQuery,
  useLazyGetAllLessonsQuery,
  useLazyGetAllSectionsQuery,
  useLazyGetAllDefinitionsQuery,
  useLazyGetAllWordsQuery,
} = adminApiSlice;
