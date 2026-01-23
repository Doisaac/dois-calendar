export interface RegisterResponse {
  ok: boolean
  uui: string
  name: string
  token: string
}
export interface RegisterErrorResponse {
  ok: boolean
  msg: string
}

export interface ValidationErrorItem {
  type: string
  value: string
  msg: string
  path: string
  location: string
}

export interface RegisterValidationErrorResponse {
  ok: false
  errors: ValidationErrorItem[]
}

export type RegisterApiError =
  | RegisterErrorResponse
  | RegisterValidationErrorResponse
