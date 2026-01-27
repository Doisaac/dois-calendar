import type { Event } from "./event";

export interface getEventsResponse {
  ok: boolean,
  events: Event[]
}