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
    addLessonIntro: builder.mutation({
      query: (introData) => ({
        url: "/admin/lessons/intro",
        method: "POST",
        body: { introData },
      }),
      invalidatesTags: ["Lesson"],
    }),
    editLessonIntro: builder.mutation({
      query: (introData) => ({
        url: "/admin/lessons/intro",
        method: "PATCH",
        body: { introData },
      }),
      invalidatesTags: ["Lesson"],
    }),
    deleteLessonIntro: builder.mutation({
      query: (introData) => ({
        url: "/admin/lessons/intro",
        method: "DELETE",
        body: { introData },
      }),
      invalidatesTags: ["Lesson"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetAdminLessonsQuery,
  useAddLessonMutation,
  useEditLessonMutation,
  useDeleteLessonMutation,
  useAddLessonIntroMutation,
  useEditLessonIntroMutation,
  useDeleteLessonIntroMutation,
} = lessonsApiSlice;
