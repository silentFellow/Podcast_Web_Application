import { FC } from 'react'
import { user } from '../contexts/users'

const Explore: FC = () => {

  const { signout } = user()

  const signOut = async (): Promise<void> => {
    try {
      await signout()
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <button onClick={() => signOut()}>SIGN OUT</button>
    </div>
  )
}

export default Explore