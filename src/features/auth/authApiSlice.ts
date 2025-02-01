import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({
        username,
        password,
      }: {
        username: string;
        password: string;
      }) => ({
        url: "/user/auth",
        method: "POST",
        body: { username, password },
      }),
    }),
    register: builder.mutation({
      query: ({
        username,
        password,
      }: {
        username: string;
        password: string;
      }) => ({
        url: "/user/register",
        method: "POST",
        body: { username, password },
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: "/user/logout",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/user/refresh",
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
