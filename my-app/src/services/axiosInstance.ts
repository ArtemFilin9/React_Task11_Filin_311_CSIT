import axios from 'axios'
import type { RootState } from '../app/store'
import { store } from '../app/store'
import { setError, openModal } from '../store/settingsSlice'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
})

axiosInstance.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState()
    const token = state.user.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || 'Ошибка сервера';
    store.dispatch(setError(message));
    store.dispatch(openModal());
    return Promise.reject(error)
  }
)