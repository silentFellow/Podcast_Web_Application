import { FC, useState } from 'react'
import { Sidenav, Cardmax, Card, Topnav } from '../components'
import { category } from '../constants/category'

<link href="https://fonts.googleapis.com/css?family=Bungee+Inline" rel="stylesheet"></link>

const Explore: FC = () =>{  

  const [activeCategory, setActiveCategory] = useState<string>(category[0].key)

  return (
    <div style={{top:0,marginTop:0}}>
      <Topnav />
      <Sidenav active={activeCategory} setActive={setActiveCategory} />
      <div className='ExplorePage'>

      <div className='Discover'>
        <h3 style={{marginLeft:"10px"}}>{activeCategory}</h3>
        <h4>more {">"}</h4>
      </div>

      {activeCategory == 'TRENDING' || activeCategory == 'AUDIO' || activeCategory == 'VIDEO' ? 
        <div className="card_grid">
          <Card />
        </div> 
        :
        <Cardmax />
      }
      </div>
    </div>
  )
}

export default Explore