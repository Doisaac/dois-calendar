import { useAppDispatch, useAppSelector } from './hooks'
import { onCloseDateModal, onOpenDateModal } from '@/store/ui/uiSlice'
import { useCalendarStore } from './useCalendarStore'

export const useUiStore = () => {
  const dispatch = useAppDispatch()

  const { isDateModalOpen } = useAppSelector((state) => state.ui)
  const { setActiveEvent } = useCalendarStore()

  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal())
    setActiveEvent(null)
  }

  const toggleDateModal = () => {
    isDateModalOpen ? closeDateModal() : openDateModal()
  }

  return {
    //* Properties
    isDateModalOpen,

    //* Methods
    openDateModal,
    closeDateModal,
    toggleDateModal,
  }
}
