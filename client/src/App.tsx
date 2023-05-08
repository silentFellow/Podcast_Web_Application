import { FC, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, Signup, Login, PrivateRouteLogin, PrivateRouteExplore, CreatePodcast, Explore } from "./pages/"
import { UsersProvider, PodProvider } from './contexts'

const App: FC = () => {

  const color: string = localStorage.getItem('theme') || 'dark'
  const [theme, setTheme] = useState<'dark' | 'light'>(color as 'dark' || 'light')

  return (
    <div className={`${theme == 'dark' ? 'dark' : 'light'}`}>
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
                <Route path="/explore" element={<Explore theme={theme} setTheme={setTheme} />} />
                <Route path="/create" element={<CreatePodcast />} />
              </Route>
            </Routes>
          </PodProvider>
        </UsersProvider>
      </Router>
    </div>
  )
}

export default App