import { configureStore } from "@reduxjs/toolkit";
import chapterReducer from "../context/chapterSlice";

export const store = configureStore({
  reducer: {
    chapter: chapterReducer,
  },
});
