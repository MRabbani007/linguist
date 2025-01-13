import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const textBlockApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLessonTextBlocks: builder.query<TextBlock[], string>({
      query: (lessonID) => ({
        url: "/admin/textBlocks",
        method: "GET",
        params: { lessonID },
      }),
      providesTags: ["textBlock"],
    }),
    addTextBlock: builder.mutation({
      query: (textBlock) => ({
        url: "/admin/textBlocks",
        method: "POST",
        body: { textBlock },
      }),
      invalidatesTags: ["textBlock"],
    }),
    editTextBlock: builder.mutation({
      query: (textBlock) => ({
        url: "/admin/textBlocks",
        method: "PATCH",
        body: { textBlock },
      }),
      invalidatesTags: ["textBlock"],
    }),
    deleteTextBlock: builder.mutation({
      query: (id) => ({
        url: "/admin/textBlocks",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["textBlock"],
    }),
  }),
});

export const {
  useAddTextBlockMutation,
  useEditTextBlockMutation,
  useDeleteTextBlockMutation,
  useGetLessonTextBlocksQuery,
  useLazyGetLessonTextBlocksQuery,
} = textBlockApiSlice;

export const selectSectionText = (sectionID: string, lessonID: string) =>
  createSelector(
    textBlockApiSlice.endpoints.getLessonTextBlocks.select(lessonID),
    (result) => result?.data?.filter((item) => item.sectionID === sectionID)
  );
