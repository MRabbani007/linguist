// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { store } from "../../app/store";

// const profileAdapter = createEntityAdapter({});

// const initialState = profileAdapter.getInitialState();

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
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUpdateLessonProgressMutation,
} = profileApiSlice;

// returns the query result object
// export const selectProfileResult =
//   profileApiSlice.endpoints.getProfile.select();

// const selectProfileData = createSelector(
//   selectProfileResult,
//   (result) => result.data // normalized state object with ids & entities
// );

// export const selectProgressChapter = (chapterID = "") => {
//   const profile = profileApiSlice.endpoints.getProfile.select();
//   console.log(profile);
//   return profile?.chapters.find((c) => c.id === chapterID);
// };

// export const selectProgressLesson = (chapterID = "", lessonID = "") => {
//   const profile = profileApiSlice.endpoints.getProfile.select();
//   const chapter = profile.chapters.find((c) => c.id === chapterID);
//   return chapter?.lessons.find((l) => l.id === lessonID);
// };
