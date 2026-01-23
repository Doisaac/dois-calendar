import { calendarApi } from '@/api/calendarApi'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '@/store/auth/authSlice'
import { type RegisterResponse } from '@/interfaces/register.response'

interface UserInformation {
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

  return {
    //* Properties
    status,
    user,
    errorMessage,

    //* Methods
    startLogin,
  }
}
