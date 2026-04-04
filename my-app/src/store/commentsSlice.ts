import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getData, postData } from '../services/api'
import { logout } from './userSlice';

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

interface CommentsState {
  comments: Comment[]
}

const initialState: CommentsState = {
  comments: [],
}

export const fetchComments = createAsyncThunk<Comment[]>(
  'comments/fetchComments',
  async () => {
    return await getData<Comment[]>('/comments')
  }
)
export const addComment = createAsyncThunk<
  Comment,
  { postId: number; body: string; name?: string; email?: string }
  >('comments/addComment', async (newCommentData) => {
  return await postData<Comment, typeof newCommentData>('/comments', newCommentData);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload
        }
      )
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      })
      .addCase(logout, (state) => {
        state.comments = [];
      });
  },
})

export default commentsSlice.reducer