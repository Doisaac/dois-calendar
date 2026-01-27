import type { Event } from './event'

export interface EventCreationResponse {
  ok: boolean
  event: Event
}

export interface EventUpdateResponse {
  ok: boolean
  msg: string
  event: Event
}
