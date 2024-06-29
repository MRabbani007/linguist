import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { store } from "../../app/store";
import { setSiteLanguages } from "./globalsSlice";

const globalsAdapter = createEntityAdapter({
  // select id if id is not default entity.id
  selectId: (item) => item?.id,
  // TODO: change compare value to date or sort option
  sortComparer: false,
});

const initialState = globalsAdapter.getInitialState();

export const globalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChapterSummary: builder.query({
      query: (langID) => ({
        url: "/chapter/summary",
        method: "GET",
        params: { langID },
      }),
      transformResponse: (responseData) => {
        // store.dispatch(setAllCount(responseData));
        return globalsAdapter.setAll(
          initialState,
          responseData.map((item) => {
            return { id: item._id, ...item };
          })
        );
      },
    }),
    getLanguages: builder.query({
      query: () => ({ url: "/languages", method: "GET" }),
      transformResponse: (responseData) => {
        store.dispatch(setSiteLanguages(responseData));
        return globalsAdapter.setAll(
          initialState,
          responseData.map((item) => {
            return { id: item._id, ...item };
          })
        );
      },
    }),
  }),
});

export const { useGetChapterSummaryQuery, useGetLanguagesQuery } =
  globalsApiSlice;
