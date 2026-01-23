import { getEnvVariables } from '@/helpers/getEnvVariables'
import axios from 'axios'

const { VITE_BACKEND_URL } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_BACKEND_URL,
})

//TODO: Add interceptors

export { calendarApi }
