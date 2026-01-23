import type { User } from '@/interfaces/user.interface'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Auth {
  status: AuthStatus
  user: User | {}
  errorMessage: string | undefined
}

export type AuthStatus = 'not-authenticated' | 'authenticated' | 'checking'

const initialState: Auth = {
  status: 'checking',
  user: {},
  errorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking'
      state.user = {}
      state.errorMessage = undefined
    },
    onLogin: (state, action: PayloadAction<User>) => {
      const { payload } = action

      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = undefined
    },
    onLogout: (state, action: PayloadAction<string>) => {
      const { payload } = action

      state.status = 'not-authenticated'
      state.user = {}
      state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined
    },
  },
})

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions

export default authSlice.reducer
