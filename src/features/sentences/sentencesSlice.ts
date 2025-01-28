import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

type GetSentQuery = {
  searchTerm?: string;
  lessonID?: string;
  page?: number;
  sort?: string;
  asscending?: string;
  ipp?: number;
};

type GetSentRes = { data: Sentence[]; count: number };

export const sentencesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSentences: builder.query<GetSentRes, GetSentQuery>({
      query: ({
        searchTerm = "",
        lessonID = "",
        page = 1,
        sort,
        asscending,
        ipp,
      }) => ({
        url: "/admin/sentences",
        method: "GET",
        params: { searchTerm, lessonID, page, sort, asscending, ipp },
      }),
      transformResponse: (response: any) => {
        // Assuming the API response is { todos: [...], total: number }
        const { data, count }: { data: Sentence[]; count: number } = response;
        const sorted = [...data].sort((a, b) =>
          a?.sortIndex > b?.sortIndex ? 1 : -1
        );
        return { data: sorted, count }; // Structure the response for easy usage in components
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.data.map(({ id }) => ({
                type: "Sentence" as const,
                id,
              })), // Provide tags for each todo
              { type: "Sentence", id: "SENTENCELIST" }, // A special tag to track the entire list
            ]
          : [{ type: "Sentence", id: "SENTENCELIST" }],
    }),
    addSentence: builder.mutation({
      query: (sentence) => ({
        url: "/admin/sentences",
        method: "POST",
        body: { sentence },
      }),
      invalidatesTags: [{ type: "Sentence", id: "SENTENCELIST" }],
    }),
    editSentence: builder.mutation({
      query: (sentence) => ({
        url: "/admin/sentences",
        method: "PATCH",
        body: { sentence },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Sentence", id }],
    }),
    removeSentence: builder.mutation({
      query: (id) => ({
        url: "/admin/sentences",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Sentence", id: arg.id },
      ],
    }),
  }),
});

export const {
  useLazyGetAdminSentencesQuery,
  useAddSentenceMutation,
  useEditSentenceMutation,
  useRemoveSentenceMutation,
} = sentencesApiSlice;

export const selectSectionSentences = (
  lessonID: string,
  ipp: number,
  sectionID: string
) =>
  createSelector(
    sentencesApiSlice.endpoints.getAdminSentences.select({
      lessonID,
      ipp,
    }),
    (result) => {
      return result?.data
        ? result?.data?.data.filter((item) => item.sectionID === sectionID)
        : [];
    }
  );
