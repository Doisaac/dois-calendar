import { calendarApi } from '@/api/calendarApi'
import type { FormValues } from '../components/CalendarModal'
import { type EventCreationResponse } from '@/interfaces/event.response'

export const createEventAction = async (calendarEvent: FormValues) => {
  const { data } = await calendarApi.post<EventCreationResponse>(
    '/events',
    calendarEvent,
  )

  return data
}
