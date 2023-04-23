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

  const [currentUser, setCurrentUser] = useState<any>({})
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
    localStorage.removeItem('name')
    localStorage.removeItem('pass')
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

/* 
localStorage.setItem('userName', res.data.userName)
          localStorage.setItem('uid', res.data.uid)
          localStorage.setItem('collection', res.data.collection)
          localStorage.setItem('favourites', res.data.favourites)
          userSetup(localStorage.getItem('userName'), localStorage.getItem('uid'), localStorage.getItem('collection'), localStorage.getItem('favourites'))
           */