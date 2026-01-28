import { calendarApi } from '@/api/calendarApi'
import type { EventDeleteResponse } from '@/interfaces/event.response'

export const deleteEventAction = async (eventId: string | number) => {
  const { data } = await calendarApi.delete<EventDeleteResponse>(
    `/events/${eventId}`,
  )

  return data.event
}
