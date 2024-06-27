import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, roles: null, token: null },
  reducers: {
    setCredentials: (state = initialState, action) => {
      const { user, roles, token } = action.payload;
      return { ...state, user, roles, token };
    },
    logOut: (state, action) => {
      return { ...state, user: null, roles: null, token: null };
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuth = (state) => state?.auth;
export const selectCurrentUser = (state) => state?.auth?.user;
export const selectCurrentToken = (state) => state?.auth?.token;
export const selectCurrentRoles = (state) => state?.auth?.roles;
// export const selectConfig = (state) => {
//   return {
//     headers: { Authorization: `Bearer ${state?.auth?.token}` },
//   };
// };
