// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { store } from "../../app/store";

// const profileAdapter = createEntityAdapter({});

// const initialState = profileAdapter.getInitialState();

type WordListQuery = { words: Word[]; wordsData: WordData[] };

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, null>({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateLessonProgress: builder.mutation({
      query: (lessonProg) => ({
        url: "/user/progress/lesson",
        method: "PATCH",
        // headers: {
        //   Authorization: `Bearer ${store.getState()?.auth?.token}`,
        // },
        body: { lessonProg },
      }),
      invalidatesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: ({ type, data }) => ({
        url: "/user/profile",
        method: "PATCH",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: type,
            payload: { userName: store.getState()?.auth?.user, data },
          },
        },
      }),
      invalidatesTags: [{ type: "Profile", id: "Profile" }],
    }),
    getSettings: builder.query({
      query: () => ({
        url: "/user/settings",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateSettings: builder.query({
      query: ({ update }) => ({
        url: "/user/settings",
        method: "PATCH",
        body: { update },
      }),
      providesTags: ["Profile"],
    }),
    getWordLists: builder.query<WordList[], null>({
      query: () => ({
        url: "/user/lists",
        method: "GET",
      }),
      providesTags: ["UserWordList"],
    }),
    createWordList: builder.mutation({
      query: (wordList) => ({
        url: "/user/lists",
        method: "POST",
        body: { wordList },
      }),
      invalidatesTags: ["UserWordList"],
    }),
    editWordList: builder.mutation({
      query: (wordList) => ({
        url: "/user/lists",
        method: "PATCH",
        body: { wordList },
      }),
      invalidatesTags: ["UserWordList"],
    }),
    deleteWordList: builder.mutation({
      query: (id) => ({
        url: "/user/lists",
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["UserWordList"],
    }),
    getWordListbyID: builder.query<WordListQuery, string>({
      query: (id) => ({
        url: "/user/lists/items",
        method: "GET",
        params: { id },
      }),
      providesTags: ["UserWordList"],
    }),
    addListWord: builder.mutation({
      query: ({ words, listID }) => ({
        url: "/user/lists/items/bulk",
        method: "POST",
        body: { words, listID },
      }),
      invalidatesTags: ["UserWordList"],
    }),
    editListWord: builder.mutation({
      query: (word) => ({
        url: "/user/lists/items",
        method: "PATCH",
        body: { word },
      }),
      invalidatesTags: ["UserWordList"],
    }),
    deleteListWord: builder.mutation({
      query: (id) => ({
        url: "/user/lists/items",
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["UserWordList"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useGetSettingsQuery,
  useUpdateSettingsQuery,
  useUpdateLessonProgressMutation,
  useGetWordListsQuery,
  useCreateWordListMutation,
  useEditWordListMutation,
  useDeleteWordListMutation,
  useGetWordListbyIDQuery,
  useAddListWordMutation,
  useEditListWordMutation,
  useDeleteListWordMutation,
} = profileApiSlice;
