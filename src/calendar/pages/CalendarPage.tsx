import { addHours } from 'date-fns'
import { Calendar, type EventPropGetter } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../components/Navbar'
import { localizer } from '@/helpers/calendarLocalizer'
import { getMessagesEs } from '@/helpers/getMessages'

export interface CalendarEvent {
  title: string
  notes: string
  start: Date
  end: Date
  bgColor: string
  user: {
    _id: string
    name: string
  }
}

const events: CalendarEvent[] = [
  {
    title: 'Cumpleaños del jefe',
    notes: 'Comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Fernando',
    },
  },
]

export const CalendarPage = () => {
  const eventStyleGetter: EventPropGetter<CalendarEvent> = (
    event,
    start,
    end,
    isSelected
  ) => {
    // TODO: Remove this temporal log
    console.log({ event, start, end, isSelected })

    const style: React.CSSProperties = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style,
    }
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        endAccessor="end"
        events={events}
        localizer={localizer}
        messages={getMessagesEs()}
        startAccessor="start"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
      />
    </>
  )
}
