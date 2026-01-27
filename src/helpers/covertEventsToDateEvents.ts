import type { CalendarEvent } from '@/interfaces/calendar.interface'
import type { Event } from '@/interfaces/event'
import { parseISO } from 'date-fns'

export const convertEventsToDateEvents = (
  events: Event[] = [],
): CalendarEvent[] => {
  return events.map((event) => {
    return {
      ...event,
      start: parseISO(event.start),
      end: parseISO(event.end),
    }
  })
}
