import type { CalendarEvent } from '@/interfaces/calendar.interface'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '@/store/calendar/calendarSlice'
import type { FormValues } from '@/calendar/components/CalendarModal'
import { createEventAction } from '@/calendar/actions/create-event.action'
import { calendarApi } from '@/api/calendarApi'

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const setActiveEvent = (calendarEvent: CalendarEvent | null) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarFormValues: FormValues) => {
    if (calendarFormValues._id) {
      // Updating
      await calendarApi.put(
        `/events/${calendarFormValues._id}`,
        calendarFormValues,
      )
      dispatch(onUpdateEvent({ ...calendarFormValues }))
    } else {
      // Creating
      const data = await createEventAction(calendarFormValues)

      dispatch(
        onAddNewEvent({
          ...calendarFormValues,
          _id: data.event.id,
          user: {
            _id: user?.uid || '',
            name: user?.name || '',
          },
        }),
      )
    }
  }

  const startDeletingEvent = async () => {
    // TODO: Send request to backend
    dispatch(onDeleteEvent())
  }

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}
