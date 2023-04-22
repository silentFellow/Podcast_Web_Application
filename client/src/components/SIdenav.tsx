import { FC } from 'react'
import './comp.css'

const Sidenav: FC = () => {

  return (
    <div className='components'>
      <h3>Silent Podcast</h3>

      <ul>
        <li>Home</li>
        <li>My collection</li>
        <li>Favourites</li>
      </ul>
    </div>
  )
}

export default Sidenav