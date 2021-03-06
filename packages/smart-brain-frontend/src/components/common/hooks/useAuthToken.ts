import { useEffect, useState } from 'react';

import { User } from '../../contexts/AuthContext';
import { config } from '../../../config';

export const useAuthToken = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = sessionStorage.getItem('AUTH_TOKEN') || '';
  const id = sessionStorage.getItem('AUTH_SESSION_ID');

  useEffect(() => {
    if (token && id) {
      setIsLoading(true);
      fetch(config.backendUrl + `profile/${id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error('Unauthorized');
        })
        .then((user) => {
          setUser(user[0]);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [id, token]);
  return {
    user,
    setUser,
    isLoading
  };
};
