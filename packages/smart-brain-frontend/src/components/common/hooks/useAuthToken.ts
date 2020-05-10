import { useEffect, useState } from 'react'
import { User } from '../../contexts/AuthContext'

export const useAuthToken = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const token = window.sessionStorage.getItem('AUTH_TOKEN') || ''
  const id = window.sessionStorage.getItem('AUTH_SESSION_ID')

  useEffect(() => {
    if (token && id) {
      setIsLoading(true)
      fetch(`http://localhost:8000/profile/${id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
        .then((resp: any) => resp.json())
        .then((user: any) => {
          setUser(user[0])
          setIsLoading(false)
        })
        .catch(console.log)
    }
  }, [id, token])
  return { user, setUser, isLoading }
}
