// import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// const globalsAdapter = createEntityAdapter({
//   // select id if id is not default entity.id
// });

// const initialState = globalsAdapter.getInitialState();

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
      transformResponse: (responseData: Lesson[]) => {
        return responseData.sort((a, b) =>
          a.sortIndex > b.sortIndex ? 1 : -1
        );
      },
    }),
    getLessonsByChapterID: builder.query({
      query: (chapterID = "chapter") => ({
        url: `/lessons/chapter`,
        method: "GET",
        params: { chapterID },
      }),
    }),
    // for lesson page
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
    getExerciseLessons: builder.query<Lesson[], any>({
      query: () => ({
        url: "/exercise/lessons",
        method: "GET",
      }),
    }),
    getExerciseWords: builder.query<Word[], any>({
      query: () => ({
        url: "/exercise/words",
        method: "POST",
      }),
    }),
    getDialogues: builder.query<Dialogue[], any>({
      query: () => ({
        url: "/dialogues",
        method: "get",
      }),
    }),
    getDialogueByID: builder.query<DialogueByID, string>({
      query: (id) => ({
        url: `/dialogues/id`,
        method: "get",
        params: { id },
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
  useGetExerciseLessonsQuery,
  useLazyGetExerciseWordsQuery,
  useLazyGetDialoguesQuery,
  useLazyGetDialogueByIDQuery,
} = globalsApiSlice;