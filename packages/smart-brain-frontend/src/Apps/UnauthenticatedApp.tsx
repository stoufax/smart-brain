import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { getPath } from '../utils';

const Register = React.lazy(() => import('../components/Register/Register'));
const Signin = React.lazy(() => import('../components/Signin/Signin'));

const UnauthenticatedApp: React.FC = () => {
  return (
    <React.Suspense
      fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <FaSpinner className="spinner" size={40} />
        </div>
      }
    >
      <Router>
        <div>
          <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link className="f3 link dim black underline pa3 pointer" to={getPath('/signin')}>
              Signin
            </Link>
            <Link className="f3 link dim black underline pa3 pointer" to={getPath('/register')}>
              Register
            </Link>
          </nav>
          <Switch>
            <Route path={getPath('/signin')}>
              <Signin />
            </Route>
            <Route path={getPath('/register')}>
              <Register />
            </Route>
            <Redirect to={getPath('/signin')} />
          </Switch>
        </div>
      </Router>
    </React.Suspense>
  );
};

export default UnauthenticatedApp;
