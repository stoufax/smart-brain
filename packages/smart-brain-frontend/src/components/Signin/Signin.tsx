import React, { useState } from 'react'

import { config } from '../../config'

interface Props {
  updateRoute: any
  loadUsers: any
}
const Signin: React.FC<Props> = ({ updateRoute, loadUsers }: Props) => {
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSignInEmail(event.target.value)
  }
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSignInPassword(event.target.value)
  }

  const onSubmitChange = (): void => {
    fetch(config.backendUrl + 'signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          updateRoute('home')
          loadUsers(data)
        }
      })
  }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitChange}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => updateRoute('register')} className="f6 link dim black db pointer">
              Sign up
            </p>
          </div>
        </div>
      </main>
    </article>
  )
}

export default Signin