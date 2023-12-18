import { FC, Dispatch, SetStateAction, useState, useEffect } from 'react'
import { FaSearchengin } from 'react-icons/fa'
import { CiMenuKebab } from 'react-icons/ci'
import { user, podcast } from '../contexts'
import { Card, CollectionCard } from '.'
import { io } from 'socket.io-client'

interface Props {
  theme: string, 
  setTheme: Dispatch<SetStateAction<'dark' | 'light'>>, 
  showSideBar: boolean, 
  setShowSideBar: Dispatch<SetStateAction<boolean>>, 
  search: string, 
  setSearch: Dispatch<SetStateAction<string>>, 
  active: string, 
  showMenu: boolean, 
  setShowMenu: Dispatch<SetStateAction<boolean>>
}

const ShowCollection: FC<Props> = ({ theme, setTheme, showSideBar, setShowSideBar, search, setSearch, active, showMenu, setShowMenu }) => {

  const { signout, prof } = user()
  const { selected } = podcast()

  const [collection, setCollection] = useState<any>([])
  const [tempCollection, setTempCollection] = useState<any>(structuredClone(collection))
  const { fullCollection, formatedCollection, myCollection, favourites }: any = podcast()

  const socket = io('http://localhost:9999/')
  
  socket.on('user', async (messages) => {
    const cid: string = JSON.parse(localStorage.getItem('userCred' || ''))?.uid
    setTempCollection(structuredClone(collection))
    if(cid == messages.id) {
      const cUser = await prof(cid)
      const fav = new Set(cUser.data.favourites)

      setTempCollection(tempCollection => tempCollection.filter(clcn => !fav.has(clcn._id)))
      const res = await selected(cUser.data.favourites)
      res.map(res => setTempCollection([...res.data, ...tempCollection]))
      const favs = [...new Set(res)]
      setCollection([...favs, ...tempCollection])
      console.log(collection)
    }
  })

  useEffect(() => {
    localStorage.removeItem('favAdd')
    const getData = async () => {
      const dt: any = {
        'TRENDING': fullCollection(), 
        'EXPLORE': fullCollection(), 
        'AUDIO': formatedCollection('audio'), 
        'VIDEO': formatedCollection('video'), 
        'MY_COLLECTION': myCollection(), 
        'FAVOURITES': favourites()
      }

      const data = await dt[active]

      setCollection(data?.data?.sort((a: any, b: any) => {
        if(a.createdAt > b.createdAt) {
          return 1
        }
      }))
      localStorage.setItem('currentCollection', JSON.stringify(data?.data?.reverse()))
    }

    getData()
  }, [active])

  useEffect(() => {
    const oldCollection = JSON.parse(localStorage.getItem('currentCollection') || '')
    setCollection(oldCollection)
    if(search != '') {
      setCollection(oldCollection?.filter((clcn: any) => clcn.title.toLowerCase().includes(search.toLowerCase())))
    }
  }, [search])

  return (
    <div className={`${showSideBar ? 'hidden' : "w-full p-[3rem]"}`}>

      <div className="h-[2.4rem] w-full flex justify-between items-center z-10">
        
        {/* Search */}

        <div className="w-[90%] relative sm:w-[60%]">
          <input 
            type="text" 
            className='w-full text-[1.2rem] rounded-lg p-3 px-6 outline-none sm:text-[1.5rem] bg-lbg dark:bg-dbg text-lascent dark:text-dascent placeholder:text-lascent dark:placeholder:text-dascent'
            placeholder='Search What You Want...' 
            onChange={(e) => setSearch(e.target.value)}
          />

          <FaSearchengin 
            className='h-full absolute top-0 right-9 cursor-pointer text-[1.5rem] text-lascent dark:text-dascent'
          />

        </div>

        {/* Menu For Mobiles */}

        <section className={`${!showMenu ? 'hidden' : "sm:hidden flex flex-col justify-start p-3 absolute right-[2rem] top-[3.9rem] rounded-3xl font-black text-[1.8rem] menu text-lbg dark:text-dbg"}`}>
          <div className="Filters p-3 px-5"
            onClick={() => setShowSideBar(true)}
          >Filters</div>

          <div className="flex justify-center items-center p-3">
            <div className="h-[1.8rem] w-[4.5rem] bg-gradient-to-r from-lprimary to-dprimary rounded-xl relative cursor-pointer border-2 border-lascent dark:border-dascent"
              onClick={() => {
                let color = theme == 'light' ? 'dark' : 'light'
                localStorage.setItem('theme', color)
                theme == 'dark' ? setTheme('light') : setTheme('dark')
              }}
            >
              <div 
                className={`${theme == 'dark' ? "absolute top-[-0.4rem] right-[-0.3px] rounded-full h-[2.1rem] w-[1.8rem] border-2 dark:bg-dbg dark:border-dascent" : "absolute top-[-0.4rem] left-[-0.3px] rounded-full h-[2.1rem] w-[1.8rem] border-2 bg-lbg border-lascent"}`} 
              ></div>
            </div>
          </div>

          <div className="Filters p-3 px-5"
            onClick={async () => await signout(theme)}
          >Logout</div>
        </section>

        {/* Dm And Sign Out For Pc */}

        <div className="hidden w-[25%] sm:flex justify-end items-center sm:w-[40%]">
          <div className="h-[1rem] w-[3.3rem] bg-gradient-to-r from-lprimary to-dprimary rounded-xl relative cursor-pointer border-2 border-lascent dark:border-dascent"
            onClick={() => {
              let color = theme == 'light' ? 'dark' : 'light'
              localStorage.setItem('theme', color)
              theme == 'dark' ? setTheme('light') : setTheme('dark')
            }}
          >
            <div 
              className={`${theme == 'dark' ? "absolute top-[-0.4rem] right-[-0.3px] rounded-full h-[1.3rem] w-[1.3rem] border-2 dark:bg-dbg dark:border-dascent" : "absolute top-[-0.4rem] left-[-0.3px] rounded-full h-[1.3rem] w-[1.3rem] border-2 bg-lbg border-lascent"}`} 
            ></div>
          </div>
          <button 
            className='font-black p-2 mx-6 rounded-xl text-[1.5rem] bg-lascent dark:bg-dascent text-lprimary dark:text-dprimary hover:opacity-70' 
            onClick={async () => await signout(theme)}
          >
            Logout
          </button>

        </div>

        <CiMenuKebab 
          className='block text-[3.6rem] p-3 mx-auto sm:hidden' 
          onClick={() => setShowMenu(!showMenu)}
        />

      </div>

      <div className="min-h-screen w-full flex flex-col mt-12 z-0">

        <h2 className="text-lascent dark:text-dascent font-pacifico text-[2.4rem] sm:text-[2.7rem]">{active[0]}{active.slice(1, active.length).toLowerCase()}</h2><br />

        {active != 'MY_COLLECTION' ? 
          <div className="grid place-content-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {collection.map((clcn: any) => {
              return (
                <Card 
                  key={clcn._id} 
                  author={clcn.author}
                  title={clcn.title} 
                  category={clcn.category}
                  poster={clcn.posterURL} 
                  file={clcn.fileURL} 
                  id={clcn._id}
                />
              )
            })}
          </div>
          :
          collection.map((clcn: any) => {
            return (
              <CollectionCard 
                key={clcn._id} 
                author={clcn.author}
                title={clcn.title} 
                description={clcn.description} 
                category={clcn.category}
                poster={clcn.posterURL} 
                file={clcn.fileURL} 
                id={clcn._id}
              />
            )
          })
        }
      </div>

    </div>
  )
}

export default ShowCollection