import { FC, useState, useEffect } from 'react'
import { Sidenav, Cardmax, Card, Topnav, Player } from '../components'
import { podcast } from '../contexts'
import { category } from '../constants/category'

const Explore: FC<Props> = () => {
  const [collection, setCollection] = useState<any>([])
  const [activeCategory, setActiveCategory] = useState<string>(category[0].key)
  const [search, setSearch] = useState<string>('')

  const [url, setUrl] = useState<string>('')
  const [audio, setAudio] = useState<boolean>(false)
  const { fullCollection, formatedCollection, myCollection, favourites } = podcast()

  useEffect(() => {
    localStorage.removeItem('favAdd')
    const getData = async () => {
      const dt = {
        'TRENDING': fullCollection(), 
        'EXPLORE': fullCollection(), 
        'AUDIO': formatedCollection('audio'), 
        'VIDEO': formatedCollection('video'), 
        'MY_COLLECTION': myCollection(), 
        'FAVOURITES': favourites()
      }

      const data = await dt[activeCategory]
      
      setCollection(data?.data?.sort((a, b) => {
        if(a.createdAt > b.createdAt) {
          return 1
        }
      }))
      localStorage.setItem('currentCollection', JSON.stringify(data?.data?.reverse()))
    }

    getData()
  }, [activeCategory])

  useEffect(() => {
    const oldCollection = JSON.parse(localStorage.getItem('currentCollection'))
    setCollection(oldCollection)
    if(search != '') {
      setCollection(collection?.filter(clcn => clcn.title.toLowerCase().includes(search.toLowerCase())))
    }
  }, [search])

  return (
    <div style={{top:0,marginTop:0}}>
      <Topnav setSearch={setSearch} />
      <Sidenav setCollection={setCollection} active={activeCategory} setActive={setActiveCategory} btn={'Upload'} link={'/create'} />
      <div className='ExplorePage'>

      <div className='Discover'>
        <h3 style={{marginLeft:"10px"}}>{activeCategory}</h3>
      </div>

      {activeCategory != 'MY_COLLECTION' ? 
        <div className="card_grid">
          {collection?.map((clcn: any) => {
            return (
              <Card 
                key={clcn._id}
                author={clcn.author} 
                title={clcn.title} 
                poster={clcn.posterURL} 
                file={clcn.fileURL} 
                date={clcn.createdAt?.slice(0, 10)} 
                setUrl={setUrl}
                setAudio={setAudio}
                fileId={clcn._id}
              />
            )
          })}
        </div> 
        :
        activeCategory == 'MY_COLLECTION' && collection?.map((clcn) => {
          return (
            <Cardmax 
              key={clcn._id}
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