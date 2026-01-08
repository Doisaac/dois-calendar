import { BrowserRouter } from 'react-router'

import { AppRouter } from './router/appRouter'

export const DoisCalendar = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
