import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from '../components/Home/Home'

const AuthenticatedApp: React.FC = () => {
  return (
    <Router>
      <Route path="/">
        <Home />
      </Route>
      <Redirect to="/" />
    </Router>
  )
}
export default AuthenticatedApp
