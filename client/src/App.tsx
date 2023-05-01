import { FC } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, Signup, Login, PrivateRouteLogin, PrivateRouteExplore, CreatePod, Explore, UpdatePod } from "./pages"
import { UsersProvider, PodProvider } from './contexts'

const App: FC = () => {
  return (
    <Router>
      <UsersProvider>
        <PodProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRouteLogin />} >
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<PrivateRouteExplore />} >
              <Route path="/explore" element={<Explore />} />
              <Route path="/create" element={<CreatePod />} />
              <Route path="/update" element={<UpdatePod />} />
            </Route>
          </Routes>
        </PodProvider>
      </UsersProvider>
    </Router>
  )
}

export default App