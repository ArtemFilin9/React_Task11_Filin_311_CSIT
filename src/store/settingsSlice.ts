import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  isLoading: boolean
  error: string | null
  modalState: boolean
}

const initialState: SettingsState = {
  isLoading: false,
  error: null,
  modalState: false,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    openModal: (state) => {
      state.modalState = true
    },
    closeModal: (state) => {
      state.modalState = false
    },
  },
})

export const { setLoading, setError, openModal, closeModal } =
  settingsSlice.actions

export default settingsSlice.reducer