import type { CalendarEvent } from '@/calendar/pages/CalendarPage'
import { useAppDispatch, useAppSelector } from './hooks'
import { onAddNewEvent, onSetActiveEvent } from '@/store/calendar/calendarSlice'
import type { FormValues } from '@/calendar/components/CalendarModal'

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar)
  const dispatch = useAppDispatch()

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent: FormValues) => {
    // TODO: send to backend

    // TODO: All good
    if (calendarEvent._id) {
      // Updating
    } else {
      // Creating
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          // ! REMOVE WHEN BACKEND IS READY
          _id: new Date().getTime(),
        })
      )
    }
  }

  return {
    //* Properties
    events,
    activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
  }
}
