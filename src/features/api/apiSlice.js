import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";

let API_URL = "https://linguistserver.onrender.com";
// API_URL = "http://localhost:3000";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Brearer ${token}`);
    }
    return headers;
  },
});

const baseQuerywithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    // console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    // console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;

      // store new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: baseQuerywithReauth,
  //fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: [
    "Chapter",
    "Block",
    "Section",
    "Word",
    "Definition",
    "Table",
    "TableWord",
    "User",
  ],
  endpoints: (builder) => ({}),
});
