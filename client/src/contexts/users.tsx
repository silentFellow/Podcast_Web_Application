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

    if(res.status == 200) {
      localStorage.setItem('userCred', JSON.stringify(res.data))
    }
    return res
  }

  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleAuth)
      
      return data
    }
    catch(err) {
      console.log('something went wrong')
      console.log(err)
    }
  }

  const signout = async (): Promise<void> => {
    if(users?.emailVerified == true) {
      await signOut(auth)
    }
    setCookies('access_token', '')
    localStorage.clear()
  }

  const prof = async () => {
    const id = JSON.parse(localStorage.getItem('userCred')).uid

    try {
      const res = await userApi.get('/register/profile', {
        params: {
          uid: id
        }
      })

      return res
    }
    catch(err) {
      console.log(err)
    }
  }

  const updateProf = async (clcn: string) => {
    const user = JSON.parse(localStorage.getItem('userCred'))
    const res = await userApi.post('/register/update', {
      uid: user.uid, 
      newCollection: clcn
    })
    return res
  }

  const value = {
    signup, 
    login, 
    googleLogin, 
    users, 
    prof, 
    updateProf, 
    signout
  }

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}

export default UsersProvider