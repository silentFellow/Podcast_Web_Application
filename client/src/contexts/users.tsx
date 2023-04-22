import { FC, useState, createContext, useContext } from 'react'
import { useCookies } from 'react-cookie'
import userApi from '../api/register'

export const userContext = createContext<any>(null)
export const user = () => useContext(userContext)

interface Props {
  children: any
}

const UsersProvider: FC<Props> = ({ children }) => {

  const [currentUser, setCurrentUser] = useState<string>()
  const [_, setCookies] = useCookies(['access_token'])

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

  const signout = () => {
    setCookies('access_token', '')
  }

  const value = {
    signup, 
    login, 
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