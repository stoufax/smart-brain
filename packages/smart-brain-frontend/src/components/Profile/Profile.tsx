import React, { useState } from 'react';
import md5 from 'md5';

import './Profile.css';
import { useAuth } from '../contexts';
import { config } from '../../config';
import { User } from '../contexts/AuthContext';

interface Props {
  user: User;
  toggleModal?: () => void;
}

const Profile: React.FC<Props> = ({ toggleModal, user }: Props) => {
  const { setUser } = useAuth();
  const [name, setName] = useState(user.name);
  console.log(`user`, user);
  const HashedEmail = md5(user.email);

  const onProfileUpdate = ({ id, name }: any) => {
    fetch(config.backendUrl + `profile/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('AUTH_TOKEN') || ''
      },
      body: JSON.stringify({
        name
      })
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          toggleModal && toggleModal();
          setUser({ ...user, name });
        }
      })
      .catch(console.log);
  };

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`vent.target.name`, event.target.name);
    switch (event.target.name) {
      case 'user-name':
        setName(event.target.value);
        break;
      default:
        return;
    }
  };

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
          <input onChange={onFormChange} type="text" name="user-name" className="pa2 ba w-100" value={name}></input>

          <span className="mt2 fw6">Email:</span>
          <div className="pa2  w-100">{user.email}</div>

          <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={() => onProfileUpdate({ ...user, name })}
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
  );
};

export default Profile;
