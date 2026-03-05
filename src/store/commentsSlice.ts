import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getData } from '../services/api'

/* ================= TYPES ================= */

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

/* ================= INITIAL STATE ================= */

const initialState: CommentsState = {
  comments: [],
}

/* ================= ASYNC THUNK ================= */

export const fetchComments = createAsyncThunk<Comment[]>(
  'comments/fetchComments',
  async () => {
    return await getData<Comment[]>('/comments')
  }
)

/* ================= SLICE ================= */

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload
      }
    )
  },
})

export default commentsSlice.reducer