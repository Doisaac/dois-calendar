export interface CalendarEvent {
  _id?: number | string // It is optional for creating/editing a calendar event
  title: string
  notes: string
  start: Date
  end: Date
  bgColor?: string
  user: {
    _id: string
    name: string
  }
}
