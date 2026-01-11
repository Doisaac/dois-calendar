import { useAppSelector } from './hooks'

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar)

  return {
    //* Properties
    events,
    activeEvent,

    //* Methods
  }
}
