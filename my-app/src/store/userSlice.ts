import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { postData } from '../services/api';

interface User {
  id: number
  email: string
  name: string
}

interface UserState {
  user: User | null
  token: string | null
  isAuth: boolean
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuth: false,
}


export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string }
  >('user/login', async (credentials) => {
    return await postData<
      { user: User; token: string },
      { email: string; password: string }
  >('/login', credentials);
});

export const registerUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string; name?: string }
  >('user/register', async (userData) => {
    return await postData<
      { user: User; token: string },
      { email: string; password: string; name?: string }
  >('/register', userData);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuth = false
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuth = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuth = false;
      });
  },
})

export const { logout, updateUser } = userSlice.actions
export default userSlice.reducer