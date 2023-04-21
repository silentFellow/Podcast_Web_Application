import React, { FC, useState, createContext, useContext } from 'react'
import axios from 'axios'
import userApi from '../api/register.js'

export const userContext = createContext<any>(null)
export const user = () => useContext(userContext)

interface Props {
  children: any
}

const UsersProvider: FC<Props> = ({ children }) => {

  const signup = async (name: string, pass: string): Promise<any> => {
    const res = await axios.post('/register/signup', {
      uname: name, 
      pass: pass
    })

    return res
  }

  const login = async (name: string, pass: string): Promise<any> => {
    const res = await axios.post('/register/login', {
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