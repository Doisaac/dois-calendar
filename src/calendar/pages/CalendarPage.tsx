import { useCallback, useEffect, useState } from 'react'
import { Calendar, type EventPropGetter, type View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../components/Navbar'
import { localizer } from '@/helpers/calendarLocalizer'
import { getMessagesEs } from '@/helpers/getMessages'
import { CalendarEvent } from '../CalendarEvent'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '@/hooks/useUiStore'
import { useCalendarStore } from '@/hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'
import type { CalendarEvent as CalendarEventInterface } from '@/interfaces/calendar.interface'
import { useAuthStore } from '@/hooks/useAuthStore'

const isView = (value: string): value is View => {
  return ['month', 'week', 'work_week', 'day', 'agenda'].includes(value)
}

export const CalendarPage = () => {
  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

  const storedView = localStorage.getItem('lasView')

  const [lastView] = useState<View>(
    storedView && isView(storedView) ? storedView : 'week',
  )

  const eventStyleGetter: EventPropGetter<CalendarEventInterface> = useCallback(
    (event) => {
      console.log({ eventStyle: event })

      const isMyEVent = user?.uid === event.user._id

      const style: React.CSSProperties = {
        backgroundColor: isMyEVent ? '#347CF7' : '#465660',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
      }

      return {
        style,
      }
    },
    [],
  )

  const onDoubleClick = (event: CalendarEventInterface) => {
    console.log({ doubleClick: event })
    openDateModal()
  }

  const onSelect = (event: CalendarEventInterface) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event: View) => {
    localStorage.setItem('lasView', event)
  }

  // Load the events
  useEffect(() => {
    startLoadingEvents()
  }, [])

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

      <CalendarModal />

      <FabAddNew />

      <FabDelete />
    </>
  )
}
