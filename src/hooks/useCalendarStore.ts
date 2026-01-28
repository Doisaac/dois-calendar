import type { CalendarEvent } from '@/interfaces/calendar.interface'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '@/store/calendar/calendarSlice'
import type { FormValues } from '@/calendar/components/CalendarModal'
import { createEventAction } from '@/calendar/actions/create-event.action'
import { getEventsAction } from '@/calendar/actions/get-events.action'
import { convertEventsToDateEvents } from '@/helpers/covertEventsToDateEvents'
import { updateEventAction } from '@/calendar/actions/update-event.action'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import { deleteEventAction } from '@/calendar/actions/delete-event.action'

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const setActiveEvent = (calendarEvent: CalendarEvent | null) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarFormValues: FormValues) => {
    try {
      if (calendarFormValues.id) {
        // Updating
        await updateEventAction(calendarFormValues)

        dispatch(
          onUpdateEvent({
            ...calendarFormValues,
            user: {
              name: user?.name || '',
              _id: user?.uid || '',
            },
          }),
        )

        return
      }

      // Creating
      const data = await createEventAction(calendarFormValues)

      dispatch(
        onAddNewEvent({
          ...calendarFormValues,
          id: data.event.id,
          user: {
            _id: user?.uid || '',
            name: user?.name || '',
          },
        }),
      )
    } catch (error) {
      if (error instanceof AxiosError) {
        Swal.fire(
          'Error al guardar',
          'No tienes permiso para editar este evento',
          'error',
        )
      }
    }
  }

  const startDeletingEvent = async () => {
    try {
      await deleteEventAction(activeEvent?.id || '')
      dispatch(onDeleteEvent())
    } catch (error) {
      Swal.fire(
        'Error al borrar',
        'No tienes permiso para borrar este evento',
        'error',
      )
    }
  }

  const startLoadingEvents = async () => {
    try {
      const data = await getEventsAction()

      const events = convertEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log('Error loading events')
      console.log(error)
    }
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
    startLoadingEvents,
  }
}
