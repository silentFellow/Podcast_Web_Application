import { FC } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Signup, Login, Home } from "./pages"
import UsersProvider from "./contexts/users"

const App: FC = () => {
  return (
    <Router>
      <UsersProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UsersProvider>
    </Router>
  )
}

export default App