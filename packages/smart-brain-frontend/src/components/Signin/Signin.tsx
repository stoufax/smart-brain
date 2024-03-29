import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Signin.css';

import { config } from '../../config';
import { useAuth } from '../contexts';
import { getPath } from '../../utils';

const Signin: React.FC = () => {
  const { setUser } = useAuth();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const onSubmitChange = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    fetch(config.backendUrl + 'signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
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
          sessionStorage.setItem('AUTH_TOKEN', data.token);
          sessionStorage.setItem('AUTH_SESSION_ID', data.userId);
          setUser(data.user);
        }
      })
      .catch((e) => toast(e.message, { type: 'error' }));
  };

  return (
    <form className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={handleEmailChange}
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
                onChange={handlePasswordChange}
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
            <Link className="f6 link dim black db pointer" to={getPath('/register')}>
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </form>
  );
};

export default Signin;
