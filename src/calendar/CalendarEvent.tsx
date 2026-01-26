import type { EventProps } from 'react-big-calendar'
import { type CalendarEvent as CalendarEventInterface } from '../interfaces/calendar.interface'

export const CalendarEvent = ({
  event,
}: EventProps<CalendarEventInterface>) => {
  const { title, user } = event

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}
