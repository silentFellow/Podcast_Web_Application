import React from "react"
import { Signup } from "./Components/Signup"
import { Login } from "./Components/Login"
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom"
import  { FC } from 'react'



const App: FC = () => {
  return (
    <div>

      <Router>
        <Routes>
          <Route  path="/Signup" element={<Signup/>}/>
          <Route  path="/Login" element={<Login/>}/>
        </Routes>
      </Router>
      <Login/>
   </div>
  )
}

export default App