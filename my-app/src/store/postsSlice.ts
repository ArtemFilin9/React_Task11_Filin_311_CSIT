import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getData } from '../services/api'
import { logout } from './userSlice';
import { postData } from '../services/api';

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

export const createPost = createAsyncThunk<Post, { title: string; body: string }>(
  'posts/createPost',
  async (newPostData) => {
    return await postData<Post, { title: string; body: string }>('/posts', newPostData);
});

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
      .addCase(
        createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        }
      )
      .addCase(logout, (state) => {
        state.posts = [];
      })
  },
})

export default postsSlice.reducer