export interface Event {
  id: string
  title: string
  notes: string
  start: string
  end: string
  user: {
    _id: string
    name: string
  }
}
