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

  const [users, setUsers] = useState<any>([{}])
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
    console.log(res.data)
    if(res.status == 200) {
      localStorage.setItem('userCred', JSON.stringify(res.data))
    }
    return res
  }

  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleAuth)
      console.log(data)
      localStorage.setItem('name', data.user.displayName)
      localStorage.setItem('pass', data.user.email)
    }
    catch(err) {
      console.log(err)
      console.log('something went wrong')
    }
  }

  const currentUser = async (uname: string) => {
    const res = await userApi.get('/register/userDetails', {
      params: {
        userName: uname
      }
    })

    return res
  }

  const signout = async (): Promise<void> => {
    if(users?.emailVerified == true) {
      await signOut(auth)
    }
    setCookies('access_token', '')
    localStorage.clear()
  }

  const getCurrentUser = () => JSON.parse(localStorage.getItem('userCred'))

  const value = {
    signup, 
    login, 
    googleLogin, 
    users, 
    currentUser, 
    getCurrentUser, 
    signout
  }

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}

export default UsersProvider