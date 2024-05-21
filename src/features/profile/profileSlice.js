import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { ACTIONS, SERVER } from "../../data/actions";
import { store } from "../../app/store";

const profileAdapter = createEntityAdapter({});

const initialState = profileAdapter.getInitialState();

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: SERVER.USER_PROFILE,
        method: "POST",
        body: {
          roles: store.getState()?.auth?.roles,
          action: {
            type: "GET_PROFILE",
            payload: { userName: store.getState()?.auth?.user },
          },
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Profile", id })),
              { type: "Profile", id: "Profile" },
            ]
          : [{ type: "Profile", id: "Profile" }],
    }),
    updateProfile: builder.mutation({
      query: ({ type, data }) => ({
        url: SERVER.USER_PROFILE,
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
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} = profileApiSlice;

// returns the query result object
export const selectProfileResult =
  profileApiSlice.endpoints.getProfile.select();

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
