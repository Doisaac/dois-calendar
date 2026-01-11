import type { CalendarEvent } from '@/calendar/pages/CalendarPage'
import { useAppDispatch, useAppSelector } from './hooks'
import { onSetActiveEvent } from '@/store/calendar/calendarSlice'

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar)
  const dispatch = useAppDispatch()

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  return {
    //* Properties
    events,
    activeEvent,

    //* Methods
    setActiveEvent,
  }
}
