import { FC, createContext, useContext } from 'react'
import userApi from '../api/register'

export const userContext = createContext<any>(null)
export const user = () => useContext(userContext)

interface Props {
  children: any
}

const UsersProvider: FC<Props> = ({ children }) => {

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

    return res
  }

  const value = {
    signup, 
    login
  }

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}

export default UsersProvider