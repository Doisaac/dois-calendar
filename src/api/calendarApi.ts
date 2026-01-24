import { getEnvVariables } from '@/helpers/getEnvVariables'
import axios from 'axios'

const { VITE_BACKEND_URL } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_BACKEND_URL,
})

calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.set('x-token', token)
  }

  return config
})

export { calendarApi }
