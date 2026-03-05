import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getData } from '../services/api'

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

/* ================= INITIAL STATE ================= */

const initialState: PostsState = {
  posts: [],
}

/* ================= ASYNC THUNK ================= */

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    return await getData<Post[]>('/posts')
  }
)

/* ================= SLICE ================= */

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload
      }
    )
  },
})

export default postsSlice.reducer