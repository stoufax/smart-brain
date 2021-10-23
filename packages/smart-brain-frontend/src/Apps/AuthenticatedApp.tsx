import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Home from '../components/Home/Home';
import { User } from '../components/contexts/AuthContext';
import { getPath } from '../utils';

interface Props {
  user: User;
}

const AuthenticatedApp: React.FC<Props> = ({ user }: Props) => {
  return (
    <Router>
      <Route path={getPath('/')}>
        <Home user={user} />
      </Route>
      <Redirect to={getPath('/')} />
    </Router>
  );
};

export default AuthenticatedApp;
