import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const globalsAdapter = createEntityAdapter({
  // select id if id is not default entity.id
});

const initialState = globalsAdapter.getInitialState();

export const globalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLanguages: builder.query({
      query: () => ({ url: "/languages", method: "GET" }),
      // transformResponse: (responseData) => {
      //   return globalsAdapter.setAll(
      //     initialState,
      //     responseData.map((item) => {
      //       return { id: item._id, ...item };
      //     })
      //   );
      // },
    }),
    getChapters: builder.query({
      query: (langID = "lang") => ({
        url: "/chapters",
        method: "GET",
        params: { langID },
      }),
    }),
    // for navigating between lessons and moving sections
    getAllLessons: builder.query({
      query: (langID = "lang") => ({
        url: `/lessons`,
        method: "GET",
        params: { langID },
      }),
      // transformResponse: (responseData: Lesson[]) => {
      //   return lessonsAdapter.setAll(
      //     lessonsAdapter.getInitialState(),
      //     responseData
      //   );
      // },
    }),
    getLessonsByChapterID: builder.query({
      query: (chapterID = "chapter") => ({
        url: `/lessons/chapter`,
        method: "GET",
        params: { chapterID },
      }),
    }),
    getLessonByID: builder.query({
      query: (lessonID = "lesson") => ({
        url: `/lesson`,
        method: "GET",
        params: { lessonID },
      }),
    }),
    searchSentences: builder.query<QueryResponse<Sentence>, any>({
      query: ({
        searchTerm = "",
        lessonID = "",
        page = 1,
        sort,
        asscending,
      }) => ({
        url: "/search/sentences",
        method: "GET",
        params: { searchTerm, lessonID, page, sort, asscending },
      }),
    }),
  }),
});

export const {
  useLazyGetLanguagesQuery,
  useLazyGetChaptersQuery,
  useLazyGetAllLessonsQuery,
  useLazyGetLessonsByChapterIDQuery,
  useLazyGetLessonByIDQuery,
  useLazySearchSentencesQuery,
} = globalsApiSlice;
