import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Home from '../components/Home/Home';
import { User } from '../components/contexts/AuthContext';

interface Props {
  user: User;
}

const AuthenticatedApp: React.FC<Props> = ({ user }: Props) => {
  return (
    <Router>
      <Route path="/">
        <Home user={user} />
      </Route>
      <Redirect to="/" />
    </Router>
  );
};

export default AuthenticatedApp;
