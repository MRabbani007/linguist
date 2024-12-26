import { ACTIONS, SERVER } from "../../data/actions";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: SERVER.USER_SIGNIN,
        method: "POST",
        body: {
          action: {
            type: ACTIONS.USER_SIGNIN,
            payload: {
              ...credentials,
            },
          },
        },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: SERVER.USER_SIGNUP,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: SERVER.USER_LOGOUT,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: SERVER.USER_REFRESH,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
