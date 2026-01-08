import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { DoisCalendar } from './DoisCalendar'
import './style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DoisCalendar />
  </StrictMode>
)
