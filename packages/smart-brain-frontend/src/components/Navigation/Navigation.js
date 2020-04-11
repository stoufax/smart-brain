import React from 'react'

const Navigation = ({ isSignin, updateRoute }) => {
  if (!isSignin) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className="f3 link dim black underline pa3 pointer" onClick={() => updateRoute('signin')}>
          Sign Out
        </p>
      </nav>
    )
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className="f3 link dim black underline pa3 pointer" onClick={() => updateRoute('signin')}>
          SignIn
        </p>
        <p className="f3 link dim black underline pa3 pointer" onClick={() => updateRoute('register')}>
          Register
        </p>
      </nav>
    )
  }
}

export default Navigation
