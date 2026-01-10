import { BrowserRouter } from 'react-router'

import { AppRouter } from './router/appRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'

export const DoisCalendar = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
