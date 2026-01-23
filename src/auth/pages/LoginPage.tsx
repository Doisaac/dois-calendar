import { useEffect, type FormEvent } from 'react'
import { useForm } from '../../hooks/useForm'

import './LoginPage.css'
import { useAuthStore } from '@/hooks/useAuthStore'
import Swal from 'sweetalert2'

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore()

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields)

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields)

  const loginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startLogin({ email: loginEmail, password: loginPassword })
  }

  const registerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({
      registerEmail,
      registerPassword,
      registerName,
      registerPassword2,
    })
  }

  // Pop out the error message
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
