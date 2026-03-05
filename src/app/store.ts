import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../store/userSlice'
import settingsReducer from '../store/settingsSlice'
import postsReducer from '../store/postsSlice'
import commentsReducer from '../store/commentsSlice'
import albumsReducer from '../store/albumsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    posts: postsReducer,
    comments: commentsReducer,
	albums: albumsReducer,
  },
})

// Типы
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch