import { FC, useState, createContext, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import userApi from '../api/register'
import { auth, googleAuth } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

export const userContext = createContext<any>(null)
export const user = () => useContext(userContext)

interface Props {
  children: any
}

const UsersProvider: FC<Props> = ({ children }) => {

  const [currentUser, setCurrentUser] = useState<string>()
  const [user, setUser] = useState<any>()
  const [_, setCookies] = useCookies(['access_token'])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userName => {
      setUser(userName)
    })

    return unsubscribe
  }, [])

  const signup = async (name: string, pass: string): Promise<any> => {
    const res = await userApi.post('/register/signup', {
      uname: name, 
      pass: pass
    })

    return res
  }

  const login = async (name: string, pass: string): Promise<any> => {
    const res = await userApi.post('/register/login', {
      uname: name, 
      pass: pass
    })

    if(res.status == 200) {
      setCurrentUser(res.data)
    }

    return res
  }

  const googleLogin = async (): Promise<any> => {
    signInWithPopup(auth, googleAuth)
    const res = await userApi.post('/register/signup', {
      uname: user.displayName, 
      pass: user.email, 
      google: true
    })

    console.log(res) 
    if(res.status != 200) {
      const res = await userApi.post('/register/login', {
        uname: user.displayName, 
        pass: user.email, 
        google: true
      })
      console.log(res)
  
      if(res.status == 200) {
        setCurrentUser(res.data)
      }
      console.log(currentUser)
    }
    return res
  }

  const signout = () => {
    setCookies('access_token', '')
  }

  const value = {
    signup, 
    login, 
    googleLogin, 
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