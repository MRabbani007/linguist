import { apiSlice } from "../api/apiSlice";

type GetSentQuery = {
  searchTerm?: string;
  lessonID?: string;
  page?: number;
  sort?: string;
  asscending?: string;
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
      }) => ({
        url: "/admin/sentences",
        method: "GET",
        params: { searchTerm, lessonID, page, sort, asscending },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.data.map(({ id }) => ({
                type: "Sentence" as const,
                id,
              })), // Provide tags for each todo
              { type: "Sentence", id: "SENTENCE" }, // A special tag to track the entire list
            ]
          : [{ type: "Sentence", id: "SENTENCE" }],
    }),
    addSentence: builder.mutation({
      query: (sentence) => ({
        url: "/admin/sentences",
        method: "POST",
        body: { sentence },
      }),
      invalidatesTags: [{ type: "Sentence", id: "SENTENCE" }],
    }),
    editSentence: builder.mutation({
      query: (sentence) => ({
        url: "/admin/sentences",
        method: "PATCH",
        body: { sentence },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Sentence", id: arg.id },
      ],
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
