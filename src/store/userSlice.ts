import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuth = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuth = false
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { login, logout, updateUser } = userSlice.actions
export default userSlice.reducer