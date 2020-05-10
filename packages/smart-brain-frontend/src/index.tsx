import React from 'react'
import ReactDOM from 'react-dom'
import 'tachyons'

import App from './App'
import { AuthProvider } from './components/contexts'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
