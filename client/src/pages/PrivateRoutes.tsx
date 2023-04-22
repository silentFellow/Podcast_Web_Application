import { Outlet, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie'

const PrivateRouteExplore = () => {

  const [cookies, _] = useCookies(['access_token'])

  return (
    cookies.access_token ? <Outlet /> : <Navigate to='/login' />
  )
}

const PrivateRouteLogin = () => {

  const [cookies, _] = useCookies(['access_token'])

  return (
    !cookies.access_token ? <Outlet /> : <Navigate to='/explore' />
  )
}

export {
  PrivateRouteExplore, 
  PrivateRouteLogin
}