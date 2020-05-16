import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Signin.css';

import { config } from '../../config';
import { useAuth } from '../contexts';

const Signin: React.FC = () => {
  const { setUser } = useAuth();

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSignInEmail(event.target.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSignInPassword(event.target.value);
  };

  const onSubmitChange = (): void => {
    fetch(config.backendUrl + 'signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Incorrect username or password.');
        }
      })
      .then((data) => {
        if (data.success) {
          window.sessionStorage.setItem('AUTH_TOKEN', data.token);
          window.sessionStorage.setItem('AUTH_SESSION_ID', data.userId);
          setUser(data.user);
        }
      })
      .catch((e) => toast(e.message, { type: 'error' }));
  };

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
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
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
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
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
            <Link className="f6 link dim black db pointer" to="register">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Signin;
