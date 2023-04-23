import { FC } from 'react'
import { category } from '../constants/category'
import './comp.css'

interface Props {
  active: string, 
  setActive: any
}

const Sidenav: FC<Props> = ({ active, setActive }) => {
  return (
    <div className='components'>
      <div className='Sidenav'>
        <ul>
          {category.map(category => {
            return (
              <li key={category.key}
                onClick={() => setActive(category.key)}
                className={`${active == category.key ? 'selected' : 'category'}`}
              >{category.title}</li>
            )
          })}
        </ul>
      </div>
     
    </div>
  )
}

export default Sidenav