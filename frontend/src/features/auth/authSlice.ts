import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  username: string | null;
}

const initialState: AuthState = {
  token: null,
  username: null,
};

// Async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post("/api/auth/", { username, password });
    return { token: response.data.access, username };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
