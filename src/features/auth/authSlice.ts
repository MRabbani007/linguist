import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: string | null;
  roles: number[] | null;
  token: string | null;
}

const initialState: InitialState = { user: null, roles: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, roles, token } = action.payload;
      return { ...state, user, roles, token };
    },
    logOut: (state) => {
      return { ...state, user: null, roles: null, token: null };
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuth = (state: RootState) => state?.auth;
export const selectCurrentUser = (state: RootState) => state?.auth?.user;
export const selectCurrentToken = (state: RootState) => state?.auth?.token;
export const selectCurrentRoles = (state: RootState) => state?.auth?.roles;
// export const selectConfig = (state) => {
//   return {
//     headers: { Authorization: `Bearer ${state?.auth?.token}` },
//   };
// };
