import { calendarApi } from '@/api/calendarApi'
import { type EventUpdateResponse } from '@/interfaces/event.response'
import type { FormValues } from '../components/CalendarModal'

export const updateEventAction = async (calendarFormValues: FormValues) => {
  const { id } = calendarFormValues
  const { data } = await calendarApi.put<EventUpdateResponse>(
    `/events/${id}`,
    calendarFormValues,
  )

  return data.event
}
