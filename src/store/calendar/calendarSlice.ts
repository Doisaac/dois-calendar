import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

import type { CalendarEvent } from '@/calendar/pages/CalendarPage'

interface CalendarState {
  events: CalendarEvent[]
  activeEvent: null | CalendarEvent
}

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Cumpleaños del jefe',
  notes: 'Comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando',
  },
}

const initialState: CalendarState = {
  events: [tempEvent],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
  },
})

export const { onSetActiveEvent } = calendarSlice.actions
export default calendarSlice.reducer
