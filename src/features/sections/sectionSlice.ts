import { apiSlice } from "../api/apiSlice";

type QueryParams = { lessonID: string; page: number };

export const sectionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSections: builder.query<QueryResponse<Section>, QueryParams>({
      query: ({ lessonID = "lesson", page = 1 }) => ({
        url: "/admin/sections",
        method: "GET",
        params: { lessonID, page },
      }),
      providesTags: ["Section"],
    }),
    addSection: builder.mutation({
      query: (section) => ({
        url: "/admin/sections",
        method: "POST",
        body: { section },
      }),
      invalidatesTags: ["Section"],
    }),
    editSectionHeader: builder.mutation({
      query: (section) => ({
        url: "/admin/sections",
        method: "PATCH",
        body: { section },
      }),
      invalidatesTags: ["Section"],
    }),
    editSectionLessonID: builder.mutation({
      query: (section) => ({
        url: "/admin/sections/move",
        method: "PATCH",
        body: { section },
      }),
      invalidatesTags: ["Section"],
    }),
    removeSection: builder.mutation({
      query: (id) => ({
        url: "/admin/sections",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Section"],
    }),
    addSectionIntro: builder.mutation({
      query: (introData) => ({
        url: "/admin/sections/intro",
        method: "POST",
        body: { introData },
      }),
    }),
    editSectionIntro: builder.mutation({
      query: (introData) => ({
        url: "/admin/sections/intro",
        method: "PATCH",
        body: { introData },
      }),
    }),
    deleteSectionIntro: builder.mutation({
      query: (introData) => ({
        url: "/admin/sections/intro",
        method: "DELETE",
        body: { introData },
      }),
    }),
  }),
});

export const {
  useLazyGetAdminSectionsQuery,
  useAddSectionMutation,
  useEditSectionHeaderMutation,
  useEditSectionLessonIDMutation,
  useRemoveSectionMutation,
  useAddSectionIntroMutation,
  useEditSectionIntroMutation,
  useDeleteSectionIntroMutation,
} = sectionsApiSlice;
