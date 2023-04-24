import { FC, useState, useEffect } from 'react'
import { Sidenav, Cardmax, Card, Topnav, Player } from '../components'
import { user } from '../contexts/users'
import { category } from '../constants/category'
import PodcastApi from '../api/register'

<link href="https://fonts.googleapis.com/css?family=Bungee+Inline" rel="stylesheet"></link>

const Explore: FC = () =>{
  const [collect, setCollect] = useState<any>([{}])
  const [fav, setFav] = useState<any>([{}])
  const [collection, setCollection] = useState<any>([{}])
  const [activeCategory, setActiveCategory] = useState<string>(category[0].key)
  const [search, setSearch] = useState<string>('')

  const [url, setUrl] = useState<string>('')
  const [audio, setAudio] = useState<boolean>(false)
  const { getCurrentUser, prof } = user()

  useEffect(() => {
    localStorage.removeItem('favAdd')
    const pod = async () => {
      const res = await PodcastApi.get('/podcast/get', {
        key: '', 
        value: ''
      })
      const data = (res.data).reverse()
      if(search == '') {
        setCollection(data)
      }
      else {
        setCollection(data.filter(data => data.title.toLowerCase().includes(search.toLowerCase())))
      }
      const ress = await prof()
      setCollect((ress.data.my_collection).reverse())
      setFav((ress.data.favourites).reverse())
    }
    pod()
  }, [search])

  return (
    <div style={{top:0,marginTop:0}}>
      <Topnav setSearch={setSearch} />
      <Sidenav active={activeCategory} setActive={setActiveCategory} btn={'Upload'} link={'/create'} />
      <div className='ExplorePage'>

      <div className='Discover'>
        <h3 style={{marginLeft:"10px"}}>{activeCategory}</h3>
      </div>

      {activeCategory != 'MY_COLLECTION' ? 
        <div className="card_grid">
          {activeCategory == 'EXPLORE' && collection.map((clcn: any) => {
            return (
              <Card 
                author={clcn.author} 
                title={clcn.title} 
                poster={clcn.posterURL} 
                file={clcn.fileURL} 
                date={clcn.createdAt?.slice(0, 10)} 
                setUrl={setUrl}
                setAudio={setAudio}
              />
            )
          })}

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
            if(clcn.category == 'video') {
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

          {activeCategory == 'FAVOURITES' && fav.map((cl) => {
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
        activeCategory == 'MY_COLLECTION' && collect.map((clcn) => {
          return (
            <Cardmax 
              author={clcn.author}
              title={clcn.title}
              file={clcn.fileURL} 
              setUrl={setUrl}
              setAudio={setAudio}
              id={clcn._id}
              poster={clcn.posterURL} 
              description={clcn.description}
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