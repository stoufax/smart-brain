import React, { useState } from 'react'

import './Register.css'

import { config } from '../../config'
import { useAuth } from '../contexts'

const Register: React.FC = () => {
  const { setUser } = useAuth()
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterName(event.target.value)
  }

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterEmail(event.target.value)
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterPassword(event.target.value)
  }

  const onSubmitChange = (): void => {
    fetch(config.backendUrl + 'register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.email) {
          setUser(user)
        }
      })
  }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Name
              </label>
              <input
                onChange={onNameChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={onEmailChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="password-g">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                type="password"
                name="password-g"
                id="password-g"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitChange}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  )
}

export default Register
