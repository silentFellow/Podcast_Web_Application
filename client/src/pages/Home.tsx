import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => navigate('/login'), 1)
  })

  return (
    <div>Loading...</div>
  )
}

export default Home