import { Navigate, Route, Routes } from 'react-router'

import { CalendarPage } from '@/calendar/pages/CalendarPage'
import { LoginPage } from '@/auth/pages/LoginPage'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useEffect } from 'react'
import { Loader } from './ui/Loader'

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return <Loader />
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  )
}
