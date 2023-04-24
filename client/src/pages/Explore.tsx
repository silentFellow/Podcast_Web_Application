import { FC, useState, useEffect } from 'react'
import { Sidenav, Cardmax, Card, Topnav, Player } from '../components'
import { category } from '../constants/category'
import PodcastApi from '../api/register'

<link href="https://fonts.googleapis.com/css?family=Bungee+Inline" rel="stylesheet"></link>

const Explore: FC = () =>{
  const [collection, setCollection] = useState<any>([{}])
  const [activeCategory, setActiveCategory] = useState<string>(category[0].key)

  const [url, setUrl] = useState<string>('')
  const [audio, setAudio] = useState<boolean>(false)

  useEffect(() => {
    const pod = async () => {
      const res = await PodcastApi.get('/podcast/get', {
        key: '', 
        value: ''
      })
      setCollection((res.data).reverse())
      console.log(res)
    }

    pod()
  }, [])

  return (
    <div style={{top:0,marginTop:0}}>
      <Topnav />
      <Sidenav active={activeCategory} setActive={setActiveCategory} btn={'Upload'} link={'/create'} />
      <div className='ExplorePage'>

      <div className='Discover'>
        <h3 style={{marginLeft:"10px"}}>{activeCategory}</h3>
        <h4>more</h4>
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
                setUrl={setUrl}
                setAudio={setAudio}
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
                setUrl={setUrl}
                setAudio={setAudio}
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
                  setUrl={setUrl}
                  setAudio={setAudio}
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
              file={clcn.fileURL} 
              setUrl={setUrl}
              setAudio={setAudio}
            />
          )
        })
      }
      </div>
      <Player url={url} audio={audio} className='player' />

    </div>
  )
}

export default Explore