import React, { useState } from 'react'
import md5 from 'md5'

import './Profile.css'
import { useAuth } from '../contexts'
import { config } from '../../config'

interface Props {
  user: any
  toggleModal?: () => void
}

const Profile: React.FC<Props> = ({ toggleModal }: Props) => {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const HashedEmail = md5(user.email)

  const onProfileUpdate = ({ id, name, email }: any) => {
    fetch(config.backendUrl + `profile/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage.getItem('AUTH_TOKEN') || ''
      },
      body: JSON.stringify({
        name,
        email
      })
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          toggleModal && toggleModal()
          setUser({ ...user, name, email })
        }
      })
      .catch(console.log)
  }

  const onFormChange = (event: any) => {
    switch (event.target.name) {
      case 'user-name':
        setName(event.target.value)
        break
      case 'user-email':
        setEmail(event.target.value)
        break

      default:
        return
    }
  }

  return (
    <div>
      <article className="br3 ba b--black-10 w-100 w-50-m pv3 w-25-l mw6 shadow-5 center bg-white">
        <main className="black-80 w-80">
          <img src={`https://s.gravatar.com/avatar/${HashedEmail}?s=80`} className="h3 w3 dib" alt="avatar" />
          <h1>{user.name}</h1>
          <h4>{`Images submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">
            Name:
          </label>
          <input
            onChange={onFormChange}
            type="text"
            name="user-name"
            className="pa2 ba w-100"
            placeholder={user.name}
          ></input>
          <label className="mt2 fw6" htmlFor="user-age">
            Email:
          </label>
          <input
            onChange={onFormChange}
            type="text"
            name="user-email"
            className="pa2 ba w-100"
            placeholder={user.email}
          ></input>

          <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={() => onProfileUpdate({ ...user, name, email })}
            >
              Save
            </button>
            <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20" onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>
          &times;
        </div>
      </article>
    </div>
  )
}

export default Profile
