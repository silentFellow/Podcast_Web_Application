import { FC, useState, createContext, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import userApi from '../api/register'
import { auth, googleAuth } from '../firebase'
import { signInWithPopup, signOut } from 'firebase/auth'

export const userContext = createContext<any>(null)
export const user = () => useContext(userContext)

interface Props {
  children: any
}

const UsersProvider: FC<Props> = ({ children }) => {

  const [currentUser, setCurrentUser] = useState<any>()
  const [users, setUsers] = useState<any>()
  const [_, setCookies] = useCookies(['access_token'])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userName => {
      setUsers(userName)
    })

    return unsubscribe
  }, [])

  const signup = async (name: string, pass: string, verified: boolean = false): Promise<any> => {
    const res = await userApi.post('/register/signup', {
      uname: name, 
      pass: pass, 
      google: verified
    })

    return res
  }

  const login = async (name: string, pass: string, verified: boolean = false): Promise<any> => {
    const res = await userApi.post('/register/login', {
      uname: name, 
      pass: pass, 
      google: verified
    })

    if(res.status == 200) {
      setCurrentUser(res.data)
    }

    return res
  }

  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleAuth)
      localStorage.setItem('name', data.user.displayName)
      localStorage.setItem('pass', data.user.email)
    }
    catch {
      console.log('something went wrong')
    }
  }

  const signout = async (): Promise<void> => {
    if(users?.emailVerified == true) {
      await signOut(auth)
    }
    setCookies('access_token', '')
  }

  const value = {
    signup, 
    login, 
    googleLogin, 
    users, 
    currentUser, 
    signout
  }

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}

export default UsersProvider

/* const res = await login(users.displayName, users.email, true)
      if(res.status == 200) {
        setMessage(res.data)
        setCookies('access_token', res.data.access_token)
        navigate('/explore')
      }
      else {
        const res = await signup(users.displayName, users.email, true)
        if(res.status == 200) {
          const res = await login(users.displayName, users.email, true)
          setCookies('access_token', res.data.access_token)
          navigate('/explore')
        }
        else {
          setMessage(res.data)
        }
      } */