import { axiosInstance } from './axiosInstance'
import { store } from '../app/store'
import { setLoading, setError } from '../store/settingsSlice'

/* ================= GET ================= */

export const getData = async <T>(url: string): Promise<T> => {
  try {
    store.dispatch(setLoading(true))

    const response = await axiosInstance.get<T>(url)

    return response.data
  } catch (error) {
    store.dispatch(setError('Ошибка GET запроса'))
    throw error
  } finally {
    store.dispatch(setLoading(false))
  }
}

/* ================= POST ================= */

export const createData = async <T, D>(
  url: string,
  data: D
): Promise<T> => {
  try {
    store.dispatch(setLoading(true))

    const response = await axiosInstance.post<T>(url, data)

    return response.data
  } catch (error) {
    store.dispatch(setError('Ошибка POST запроса'))
    throw error
  } finally {
    store.dispatch(setLoading(false))
  }
}

/* ================= PUT ================= */

export const updateData = async <T, D>(
  url: string,
  data: D
): Promise<T> => {
  try {
    store.dispatch(setLoading(true))

    const response = await axiosInstance.put<T>(url, data)

    return response.data
  } catch (error) {
    store.dispatch(setError('Ошибка PUT запроса'))
    throw error
  } finally {
    store.dispatch(setLoading(false))
  }
}

/* ================= PATCH ================= */

export const patchData = async <T, D>(
  url: string,
  data: D
): Promise<T> => {
  try {
    store.dispatch(setLoading(true))

    const response = await axiosInstance.patch<T>(url, data)

    return response.data
  } catch (error) {
    store.dispatch(setError('Ошибка PATCH запроса'))
    throw error
  } finally {
    store.dispatch(setLoading(false))
  }
}

/* ================= DELETE ================= */

export const deleteData = async <T>(url: string): Promise<T> => {
  try {
    store.dispatch(setLoading(true))

    const response = await axiosInstance.delete<T>(url)

    return response.data
  } catch (error) {
    store.dispatch(setError('Ошибка DELETE запроса'))
    throw error
  } finally {
    store.dispatch(setLoading(false))
  }
}