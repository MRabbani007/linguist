import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, roles: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, roles, accesToken } = action.payload;
      state.user = user;
      state.roles = roles;
      state.token = accesToken;
      return state;
    },
    logOut: (state, action) => {
      state.user = null;
      state.roles = null;
      state.token = null;
      return state;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuth = (state) => state?.auth;
export const selectCurrentUser = (state) => state?.auth?.user;
export const selectCurrentToken = (state) => state?.auth?.token;
export const selectCurrentRoles = (state) => state?.auth?.roles;
