import { useEffect, useMemo, useState, type ChangeEvent } from 'react'

type ValidatorFn<T> = (value: T) => boolean

type FormValidations<T> = {
  [K in keyof T]: [ValidatorFn<T[K]>, string]
}

type FormValidationState<T> = {
  [K in keyof T as `${string & K}Valid`]: string | null
}

export const useForm = <T extends Record<string, string>>(
  initialForm: T = {} as T,
  formValidations: FormValidations<T> = {} as FormValidations<T>,
) => {
  const [formState, setFormState] = useState<T>(initialForm)

  const [formValidation, setFormValidation] = useState<FormValidationState<T>>(
    {} as FormValidationState<T>,
  )

  useEffect(() => {
    createValidators()
  }, [formState])

  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])

  const isFormValid = useMemo(() => {
    for (const key of Object.keys(formValidation) as Array<
      keyof FormValidationState<T>
    >) {
      if (formValidation[key] !== null) return false
    }

    return true
  }, [formValidation])

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  const createValidators = (): void => {
    const formCheckedValues = {} as FormValidationState<T>

    for (const field of Object.keys(formValidations) as Array<keyof T>) {
      const [fn, errorMessage] = formValidations[field]
      const isValid = fn(formState[field])

      const key = `${String(field)}Valid` as keyof FormValidationState<T>

      formCheckedValues[key] = (
        isValid ? null : errorMessage
      ) as FormValidationState<T>[typeof key]
    }

    setFormValidation(formCheckedValues)
  }

  return {
    ...formState,
    formState,

    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  }
}
