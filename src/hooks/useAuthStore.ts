import { AxiosError } from 'axios'

import { calendarApi } from '@/api/calendarApi'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '@/store/auth/authSlice'
import { type RegisterResponse } from '@/interfaces/login.response'
import type { RegisterApiError } from '@/interfaces/register.response'

interface UserInformation {
  name?: string
  email: string
  password: string
}

export const useAuthStore = () => {
  const dispatch = useAppDispatch()
  const { status, user, errorMessage } = useAppSelector((state) => state.auth)

  const startLogin = async ({ email, password }: UserInformation) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post<RegisterResponse>('/auth', {
        email,
        password,
      })

      localStorage.setItem('token', data.token)
      localStorage.setItem(
        'token-init-date',
        JSON.stringify(new Date().getTime()),
      )

      dispatch(onLogin({ name: data.name, uid: data.uui }))
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startRegister = async ({ name, email, password }: UserInformation) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post<RegisterResponse>('/auth/new', {
        name,
        email,
        password,
      })

      localStorage.setItem('token', data.token)
      localStorage.setItem(
        'token-init-date',
        JSON.stringify(new Date().getTime()),
      )

      dispatch(onLogin({ name: data.name, uid: data.uui }))
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<RegisterApiError>

        const data = axiosError.response?.data
        let message = 'Error al registrar'

        if (data && 'msg' in data) {
          message = data.msg
        } else if (data && 'errors' in data) {
          message = data.errors[0]?.msg ?? message
        }

        dispatch(onLogout(message))
      } else {
        dispatch(onLogout('Error inesperado al registrar'))
      }

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  return {
    //* Properties
    status,
    user,
    errorMessage,

    //* Methods
    startLogin,
    startRegister,
  }
}
