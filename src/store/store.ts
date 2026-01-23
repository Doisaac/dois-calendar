import { configureStore } from '@reduxjs/toolkit'
import UiReducer from './ui/uiSlice'
import CalendarReducer from './calendar/calendarSlice'
import AuthReducer from './auth/authSlice'

export const store = configureStore({
  reducer: {
    ui: UiReducer,
    calendar: CalendarReducer,
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
