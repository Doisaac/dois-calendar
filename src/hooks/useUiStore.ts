import { useAppDispatch, useAppSelector } from './hooks'
import { onCloseDateModal, onOpenDateModal } from '@/store/ui/uiSlice'

export const useUiStore = () => {
  const dispatch = useAppDispatch()

  const { isDateModalOpen } = useAppSelector((state) => state.ui)

  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal())
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
