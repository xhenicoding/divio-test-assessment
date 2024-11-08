import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  email: string | null;
}

const initialState: AuthState = {
  token: null,
  email: null,
};

// Async thunk for logging in
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post('/api/auth/token', { email, password });
    return { token: response.data.access, email };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('email', action.payload.email);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
