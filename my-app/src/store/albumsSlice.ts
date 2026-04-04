import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getData } from '../services/api'
import { logout } from './userSlice';

/* ================= TYPES ================= */

export interface Album {
  userId: number
  id: number
  title: string
}

interface AlbumsState {
  albums: Album[]
}

const initialState: AlbumsState = {
  albums: [],
}

export const fetchAlbums = createAsyncThunk<Album[]>(
  'albums/fetchAlbums',
  async () => {
    return await getData<Album[]>('/albums')
  }
)

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAlbums.fulfilled,
        (state, action: PayloadAction<Album[]>) => {
          state.albums = action.payload
        }
      )
      .addCase(logout, (state) => {
        state.albums = [];
      });
  },
})

export default albumsSlice.reducer