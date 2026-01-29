import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { CalendarEvent } from '@/interfaces/calendar.interface'

interface CalendarState {
  isLoadingEvents: boolean
  events: CalendarEvent[]
  activeEvent: CalendarEvent | null
}

const initialState: CalendarState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (
      state,
      { payload }: PayloadAction<CalendarEvent | null>,
    ) => {
      state.activeEvent = payload
    },

    onAddNewEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events.push(payload)
      state.activeEvent = null
    },

    onUpdateEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events = state.events.map((calendarEvent) => {
        if (calendarEvent.id === payload.id) {
          return payload
        }

        return calendarEvent
      })
    },

    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (calendarEvent) => calendarEvent.id !== state.activeEvent?.id,
        )
        state.activeEvent = null
      }
    },

    onLoadEvents: (state, { payload = [] }: PayloadAction<CalendarEvent[]>) => {
      state.isLoadingEvents = false
      payload.forEach((event) => {
        const exists = state.events.some((dbState) => dbState.id === event.id)

        if (!exists) {
          state.events.push(event)
        }
      })
    },

    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true
      state.events = []
      state.activeEvent = null
    },
  },
})

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions
export default calendarSlice.reducer
