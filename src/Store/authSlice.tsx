import { createSlice } from "@reduxjs/toolkit";
import type { TUser } from "../api/user/user.types";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthContextType = {
  user: TUser | null;
  token: string | null;
  isAuth: boolean;
};

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

export const initialState: AuthContextType = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken,
  isAuth: !!savedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenState: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
      localStorage.setItem("token", action.payload);
    },

    setUserState: (state, action: PayloadAction<TUser>) => {
      state.isAuth = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logoutState: (state) => {
      state.token = null;
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setTokenState, setUserState, logoutState } = authSlice.actions;

export default authSlice.reducer;
