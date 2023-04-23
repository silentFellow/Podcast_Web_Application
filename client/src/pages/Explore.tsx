import { FC } from 'react'
import { user } from '../contexts/users'
import { Sidenav, Cardmax, Card } from '../components'

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
      <Sidenav />
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