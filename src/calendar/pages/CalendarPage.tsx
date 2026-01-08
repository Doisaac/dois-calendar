import { useState } from 'react'
import { addHours } from 'date-fns'
import { Calendar, type EventPropGetter, type View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../components/Navbar'
import { localizer } from '@/helpers/calendarLocalizer'
import { getMessagesEs } from '@/helpers/getMessages'
import { CalendarEvent } from '../CalendarEvent'

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

const isView = (value: string): value is View => {
  return ['month', 'week', 'work_week', 'day', 'agenda'].includes(value)
}

export const CalendarPage = () => {
  const storedView = localStorage.getItem('lasView')

  const [lastView, setLastView] = useState<View>(
    storedView && isView(storedView) ? storedView : 'week'
  )

  const eventStyleGetter: EventPropGetter<CalendarEvent> = (
    event,
    start,
    end,
    isSelected
  ) => {
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

  const onDoubleClick = (event: CalendarEvent) => {
    console.log({ doubleClick: event })
  }

  const onSelect = (event: CalendarEvent) => {
    console.log({ click: event })
  }

  const onViewChanged = (event: View) => {
    localStorage.setItem('lasView', event)
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        endAccessor="end"
        events={events}
        defaultView={lastView}
        localizer={localizer}
        messages={getMessagesEs()}
        startAccessor="start"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
    </>
  )
}
