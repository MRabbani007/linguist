// import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// const adminAdapter = createEntityAdapter({
// select id if id is not default entity.id
// selectId: (item) => item?.id,
// TODO: change compare value to date or sort option
// sortComparer: (a, b) => {
//   if (a?.sortIndex && b?.sortIndex) {
//     return a?.sortIndex > b?.sortIndex ? 1 : -1;
//   } else {
//     return a.lessonNo > b.lessonNo ? 1 : -1;
//   }
// },
// });

type CountResponse = {
  chaptersCount: number;
  lessonsCount: number;
  sectionsCount: number;
  wordsCount: number;
  sentenceCount: number;
};

// const initialState = adminAdapter.getInitialState();

type QueryParams = {
  page: number;
  chapter: string;
};

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLessons: builder.query<QueryResponse<Lesson>, QueryParams>({
      query: ({ page, chapter }) => ({
        url: "/admin/lessons",
        method: "GET",
        params: { page, chapter },
      }),
      // transformResponse: (responseData) => {
      //   store.dispatch(setLessonsCount(responseData?.count));
      //   // const temp = responseData?.data.sort((a, b) =>
      //   //   a.sortIndex - b.sortIndex > 0 ? 1 : -1
      //   // );
      //   return adminAdapter.setAll(initialState, responseData?.data);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Lesson", id: "LESSON" },
      //   ...result.ids.map((id) => ({ type: "Lesson", id })),
      // ],
    }),
    getAllSections: builder.query<QueryResponse<Section>, number>({
      query: () => ({
        url: "/admin/sections/all",
        method: "GET",
      }),
      // transformResponse: (responseData) => {
      //   store.dispatch(setSectionsCount(responseData?.count));
      //   return adminAdapter.setAll(initialState, responseData?.data);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Section", id: "Section" },
      //   ...result.ids.map((id) => ({ type: "Section", id })),
      // ],
    }),
    getAllDefinitions: builder.query<QueryResponse<Definition>, number>({
      query: (page) => ({
        url: "/admin/definitions",
        method: "GET",
        params: { page },
      }),
      // transformResponse: (responseData) => {
      //   store.dispatch(setDefinitionsCount(responseData?.count));
      //   return adminAdapter.setAll(initialState, responseData?.data);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Definition", id: "Definition" },
      //   ...result.ids.map((id) => ({ type: "Definition", id })),
      // ],
    }),
    getAdminWordLists: builder.query<QueryResponse<WordList>, number>({
      query: (page) => ({
        url: "/admin/wordlists",
        method: "GET",
        params: { page },
      }),
    }),
    getAllCount: builder.query<CountResponse, string>({
      query: () => ({
        url: "/admin/count",
        method: "GET",
      }),
      // transformResponse: (responseData) => {
      //   return adminAdapter.setAll(initialState, [
      //     {
      //       id: crypto.randomUUID(),
      //       responseData,
      //     },
      //   ]);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Count", id: "Count" },
      //   ...result.ids.map((id) => ({ type: "Count", id })),
      // ],
    }),
    getAdminUsers: builder.query<QueryResponse<AdminUser>, number>({
      query: (page) => ({
        url: "/admin/users",
        method: "GET",
        params: { page },
      }),
      providesTags: ["User"],
    }),
    updateAdminUser: builder.mutation({
      query: (user) => ({
        url: "/admin/users",
        method: "PATCH",
        body: { user },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllCountQuery,
  useLazyGetAdminWordListsQuery,
  useLazyGetAllLessonsQuery,
  useLazyGetAllSectionsQuery,
  useLazyGetAllDefinitionsQuery,
  useLazyGetAdminUsersQuery,
  useUpdateAdminUserMutation,
} = adminApiSlice;
