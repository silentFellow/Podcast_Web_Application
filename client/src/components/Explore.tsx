import { FC } from 'react'
import { user } from '../contexts/users'
import Sidenav from './SIdenav'
import { Cardmax } from './Cardmax'
import { Card } from './Card'
import { Topnav } from './Topnav'

<link href="https://fonts.googleapis.com/css?family=Bungee+Inline" rel="stylesheet"></link>

// export const Explore: FC = () => {

//   const { signout } = user()

//   const signOut = async (): Promise<void> => {
//     try {
//       await signout()
//     }
//     catch(err) {
//       console.log(err)
//     }
//   }

export const Explore = () =>{


  return (
    <div style={{top:0,marginTop:0}}>
      <Topnav/>
      <Sidenav/>
      <div className='ExplorePage'>

      {/* <button onClick={() => signOut()}>SIGN OUT</button> */}

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

