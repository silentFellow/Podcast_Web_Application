import { FC } from "react"
import { Signup } from "./Components/Signup"
import UsersProvider from "./contexts/users"

const App: FC = () => {
  return (
    <UsersProvider>
      <div>
        <Signup/>
      </div>
    </UsersProvider>
  )
}

export default App