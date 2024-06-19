import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

import authReducer from "../features/auth/authSlice";
import globalsReducer from "../features/globals/globalsSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    globals: globalsReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
