import { calendarApi } from '@/api/calendarApi'
import type { getEventsResponse } from '@/interfaces/getEvents.response'

export const getEventsAction = async () => {
  const { data } = await calendarApi.get<getEventsResponse>('/events')

  return data
}
