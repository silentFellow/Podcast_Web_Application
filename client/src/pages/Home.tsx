import { useEffect } from 'react'
import { Sidenav } from '../Components/SIdenav'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  //const navigate = useNavigate()

  //useEffect(() => {
  //  setTimeout(() => navigate('/login'), 3)})

  return (
    <div className='HomePage'>
      <Sidenav/>
    </div>
  )
}

export default Home