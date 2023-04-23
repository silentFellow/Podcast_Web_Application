import { FC, useState, useEffect } from 'react'
import { Sidenav, Cardmax, Card, Topnav } from '../components'
import { category } from '../constants/category'
import PodcastApi from '../api/register'

<link href="https://fonts.googleapis.com/css?family=Bungee+Inline" rel="stylesheet"></link>

const Explore: FC = () =>{
  const [collection, setCollection] = useState<any>([{}])
  const [activeCategory, setActiveCategory] = useState<string>(category[0].key)

  useEffect(() => {
    const pod = async () => {
      const res = await PodcastApi.get('/podcast/get', {
        key: '', 
        value: ''
      })
      setCollection(res.data)
      console.log(res)
    }

    pod()
  }, [])

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
          {activeCategory == 'TRENDING' && collection.map((clcn: any) => {
            return (
              <Card 
                author={clcn.author} 
                title={clcn.title} 
                poster={clcn.posterURL} 
                file={clcn.fileURL} 
                date={clcn.createdAt.slice(0, 10)}
              />
            )
          })}

          {activeCategory == 'AUDIO' && collection.filter((clcn) => {
            if(clcn.category == 'audio') {
              return clcn
            }
          }).map((cl) => {
            return (
              <Card 
                author={cl.author} 
                title={cl.title} 
                poster={cl.posterURL} 
                file={cl.fileURL} 
                date={cl.createdAt.slice(0, 10)}
              />
            )
          })}

          {activeCategory == 'VIDEO' && collection.filter((clcn) => {
            if(clcn.category == 'false') {
              return clcn
            }
            }).map((cl) => {
              return (
                <Card 
                  author={cl.author} 
                  title={cl.title} 
                  poster={cl.posterURL} 
                  file={cl.fileURL} 
                  date={cl.createdAt.slice(0, 10)}
                />
              )
            })}
        </div> 
        :
        activeCategory == 'EXPLORE' && collection.map((clcn) => {
          return (
            <Cardmax 
              author={clcn.author}
              title={clcn.title}
              file={clcn.file}
            />
          )
        })
      }
      
      </div>
    </div>
  )
}

export default Explore