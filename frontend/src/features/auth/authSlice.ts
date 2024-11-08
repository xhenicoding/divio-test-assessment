import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  username: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
};

// Async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post("/api/auth/", { username, password });
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("username", username);
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
      localStorage.removeItem("products");
      localStorage.removeItem("query");
      localStorage.removeItem("sortColumn");
      localStorage.removeItem("sortOrder");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
