import { FC } from 'react'
import { user } from '../contexts/users'
<<<<<<< HEAD:client/src/components/Explore.tsx
import Sidenav from './SIdenav'
import { Cardmax } from './Cardmax'
import { Card } from './Card'
import { Topnav } from './Topnav'
=======
import { Sidenav, Cardmax, Card } from '../components'
>>>>>>> 42f47b8dff82fcdf8c03601055122143a8037aa2:client/src/pages/Explore.tsx

<link href="https://fonts.googleapis.com/css?family=Bungee+Inline" rel="stylesheet"></link>

const Explore: FC = () =>{

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
    <div style={{top:0,marginTop:0}}>
      <Topnav/>
      <Sidenav/>
      <div className='ExplorePage'>
      <button onClick={() => signOut()}>SIGN OUT</button>

      <div className='Discover'>
        <h3 style={{marginLeft:"10px"}}>Discover</h3>
        <h4>more {">"}</h4>
      </div>
      
      <Cardmax/>

      <h3 className='Most'>Most Watched</h3>
      <Card/>
      </div>
    </div>
  )
}

export default Explore