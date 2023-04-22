import { FC } from 'react'
import { user } from '../contexts/users'

const Explore: FC = () => {
  const { currentUser } = user()
  console.log(currentUser)
  return (
    <div>Explore</div>
  )
}

export default Explore