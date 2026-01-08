import { Navigate, Route, Routes } from 'react-router'

import { CalendarPage } from '@/calendar/pages/CalendarPage'
import { LoginPage } from '@/auth/pages/LoginPage'

export const AppRouter = () => {
  type AuthStatus = 'not-authenticated' | 'authenticated'
  const authStatus: AuthStatus = 'not-authenticated'

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
