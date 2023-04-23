import { FC } from 'react'
import './comp.css'

const Sidenav: FC = () => {

  return (
    <div className='components'>
      <div className='Sidenav'>
        <ul>
          <li> <a href="">Explore</a> </li>
          <li><a href="">Trending</a></li>
          <li><a href="">Favourites</a></li>
        </ul>
      </div>
     
    </div>
  )
}

export default Sidenav