import { Dispatch, FC } from 'react'
import { Link } from 'react-router-dom'
import { category } from '../constants/category'
import './comp.css'

interface Props {
  setCollection: Dispatch<[{}]>, 
  active: string, 
  setActive: any, 
  btn: string, 
  link: string
}

const Sidenav: FC<Props> = ({ setCollection, active, setActive, btn, link }) => {
  return (
    <div className='components'>
      <div className='Sidenav'>
        <ul>
          {category.map(category => {
            return (
              <li key={category.key}
                onClick={() => {
                  setCollection(null)
                  setActive(category.key)
                }}
                className={`${active == category.key ? 'selected' : 'category'}`}
              >{category.title}</li>
            )
          })}
        </ul>
        <button className="savebtn"><Link to={link} id='upload'>{btn}</Link></button>
      </div>
    </div>
  )
}

export default Sidenav