import { useState, type ChangeEvent } from 'react'

import { addHours } from 'date-fns'
import Modal from 'react-modal'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { es } from 'date-fns/locale/es'

type FormValues = {
  title: string
  notes: string
  start: Date
  end: Date
}

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true)

  const [formValues, setFormValues] = useState<FormValues>({
    title: 'Douglas',
    notes: 'Barrera',
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const onInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [target.name]: target.value,
    }))
  }

  const onDateChange = (date: Date | null, changing: 'start' | 'end') => {
    if (!date) return
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [changing]: date,
    }))
  }

  const onCloseModal = () => {
    console.log('closing modal')
    setIsOpen(false)
  }

  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
        <div className="row mb-2 g-0">
          <label className="form-label">Fecha y hora inicio</label>
          <DatePicker
            className="form-control"
            selected={formValues.start}
            onChange={(date: Date | null) => onDateChange(date, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="row mb-2 g-0">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            className="form-control"
            selected={formValues.end}
            onChange={(date: Date | null) => onDateChange(date, 'end')}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="row mb-2 g-0">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="row mb-2 g-0">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
