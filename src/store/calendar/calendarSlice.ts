import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

import type { CalendarEvent } from '@/calendar/pages/CalendarPage'

interface CalendarState {
  events: CalendarEvent[]
  activeEvent: null | CalendarEvent
}

const tempEvent: CalendarEvent = {
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

    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },

    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((calendarEvent) => {
        if (calendarEvent._id === payload._id) {
          return payload
        }

        return calendarEvent
      })
    },

    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (calendarEvent) => calendarEvent._id !== state.activeEvent?._id
        )
        state.activeEvent = null
      }
    },
  },
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions
export default calendarSlice.reducer
