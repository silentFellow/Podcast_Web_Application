import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => navigate('/login'), 3)
  }, [])

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      Loading...
    </div>
  )
}

export default Home