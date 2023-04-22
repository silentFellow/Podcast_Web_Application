import { Outlet, Navigate } from "react-router-dom"
import { user } from "../contexts/users"

const PrivateRouteExplore = () => {

  const { currentUser } = user()

  return (
    currentUser ? <Outlet /> : <Navigate to='/login' />
  )
}

const PrivateRouteLogin = () => {

  const { currentUser } = user()

  return (
    !currentUser ? <Outlet /> : <Navigate to='/login' />
  )
}

export {
  PrivateRouteExplore, 
  PrivateRouteLogin
}