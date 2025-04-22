import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";
import { RootState } from "@/app/store";
import { SERVER_URL } from "@/lib/url";

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  method: "GET",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);

      return headers;
    }
  },
});

const baseQuerywithReauth = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery(
      {
        url: "/user/refresh",
        method: "POST",
        body: { token: (api.getState() as RootState).auth.token },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const { user, accessToken, roles } = refreshResult.data as {
        user: string;
        accessToken: string;
        roles: number[];
      };

      // store new token
      api.dispatch(setCredentials({ user, token: accessToken, roles }));

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice", // optional
  baseQuery: baseQuerywithReauth,
  //fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: [
    "Chapter",
    "Lesson",
    "Block",
    "textBlock",
    "Section",
    "Word",
    "Sentence",
    "Definition",
    "Table",
    "TableWord",
    "Dialogue",
    "DialogueItem",
    "User",
    "Profile",
    "UserWordList",
  ], // Used for caching and invalidation
  endpoints: () => ({}),
});
