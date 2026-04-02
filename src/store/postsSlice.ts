import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getData } from '../services/api'
import { logout } from './userSlice';

/* ================= TYPES ================= */

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

interface PostsState {
  posts: Post[]
}

const initialState: PostsState = {
  posts: [],
}

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    return await getData<Post[]>('/posts')
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.posts = action.payload
        }
      )
      .addCase(logout, (state) => {
        state.posts = [];
      })
  },
})

export default postsSlice.reducer