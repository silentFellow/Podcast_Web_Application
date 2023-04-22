import { FC } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, Signup, Login, Explore, PrivateRouteLogin, PrivateRouteExplore } from "./pages"
import UsersProvider from "./contexts/users"

const App: FC = () => {
  return (
  
    <Router>
      <UsersProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRouteLogin />} >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<PrivateRouteExplore />} >
            <Route path="/explore" element={<Explore />} />
          </Route>
        </Routes>
      </UsersProvider>
    </Router>


  )
}

export default App