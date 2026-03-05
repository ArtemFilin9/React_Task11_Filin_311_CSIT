import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getData } from '../services/api'

/* ================= TYPES ================= */

export interface Album {
  userId: number
  id: number
  title: string
}

interface AlbumsState {
  albums: Album[]
}

/* ================= INITIAL STATE ================= */

const initialState: AlbumsState = {
  albums: [],
}

/* ================= ASYNC THUNK ================= */

export const fetchAlbums = createAsyncThunk<Album[]>(
  'albums/fetchAlbums',
  async () => {
    return await getData<Album[]>('/albums')
  }
)

/* ================= SLICE ================= */

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAlbums.fulfilled,
      (state, action: PayloadAction<Album[]>) => {
        state.albums = action.payload
      }
    )
  },
})

export default albumsSlice.reducer