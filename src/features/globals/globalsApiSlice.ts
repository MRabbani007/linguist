// import { createEntityAdapter } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
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
      transformResponse: (responseData: Section[]) => {
        return responseData.sort((a, b) =>
          (a?.sortIndex ?? 0) > (b?.sortIndex ?? 0) ? 1 : -1
        );
      },
    }),
    searchSentences: builder.query<QueryResponse<Sentence>, any>({
      query: ({
        searchTerm = "",
        lessonID = "",
        level,
        ipp = 15,
        page = 1,
        sort,
        asscending,
      }) => ({
        url: "/search/sentences",
        method: "GET",
        params: { searchTerm, lessonID, level, ipp, page, sort, asscending },
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

export const selectLessonSections = (lessonID: string) =>
  createSelector(
    globalsApiSlice.endpoints.getLessonByID.select(lessonID),
    (result) =>
      result?.data?.map((item) => ({ label: item.title, value: item.id }))
  );

export const selectLessonbyID = (langID: string, lessonID: string) =>
  createSelector(
    globalsApiSlice.endpoints.getAllLessons.select(langID),
    (result) => {
      return result?.data?.find((item) => item?.id === lessonID);
    }
  );
