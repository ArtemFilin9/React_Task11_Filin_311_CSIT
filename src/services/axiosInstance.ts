import axios from 'axios'
import type { RootState } from '../app/store'
import { store } from '../app/store'
import { setError } from '../store/settingsSlice'

export const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // заменить на свой бэк
})

/* ================= REQUEST INTERCEPTOR ================= */

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

/* ================= RESPONSE INTERCEPTOR ================= */

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    store.dispatch(setError('Ошибка сервера'))
    return Promise.reject(error)
  }
)