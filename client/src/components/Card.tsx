import { FC, useState, useEffect } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { SiYoutubemusic } from 'react-icons/si'
import { FaPlay } from 'react-icons/fa'
import { CardPoster } from '../assets'
import { Player } from '.'
import { user } from '../contexts'

interface Props {
  author: string, 
  title: string, 
  category: string, 
  poster: string,  
  file: string, 
  id: string
}

const Card: FC<Props>= ({ author, title, category, poster, file, id }) => {

  const [File, setFile] = useState<string>('')
  const [favSet, setFavSet] = useState<Set<string>>(new Set())
  const { updateProf, prof }: any = user()

  useEffect(() => {
    const data = async () => {
      const profData = await prof()
      setFavSet(new Set(profData.data.favourites))
    }

    data()
  }, [])

  return (
    <div className="h-[15rem] w-[14rem] mob:h-[22rem] mob:w-[21rem] sm:h-[25rem] sm:w-[24rem] flex flex-col rounded-2xl mb-[2.7rem] hover:opacity-90">
      <img 
        src={poster || CardPoster} 
        alt="Missing" 
        className='w-full h-[75%]'
      />

      <div className="flex justify-between items-center h-[25%] w-full p-3">
        <div className="flex flex-col h-full w-[70%] justify-between">
          <div className='h-1/2 w-full font-black text-[0.9rem] mob:text-[1.5rem] text-lsecondary dark:text-dsecondary whitespace-nowrap overflow-hidden text-ellipsis'>{title}</div>
          <div className='h-1/2 w-full font-black text-[0.9rem] mob:text-[1.2rem] text-lascent dark:text-dascent whitespace-nowrap overflow-hidden text-ellipsis'>{author}</div>
        </div>

        <div className="flex justify-between items-center w-[30%]">
          {favSet.has(id) ? 
            <AiFillHeart 
              className='h-[36%] w-[36%] cursor-pointer text-lsecondary dark:text-dsecondary' 
              onClick={async () => await updateProf(id)}
            /> : 
            <AiOutlineHeart 
              className='h-[36%] w-[36%] cursor-pointer text-lascent dark:text-dascent' 
              onClick={async () => await updateProf(id)}
            />
          }

          { category == 'video' ? 
            <FaPlay 
              className='h-[36%] w-[36%] cursor-pointer text-lascent dark:text-dascent' 
              onClick={() => setFile(file)}
            /> : 
            <SiYoutubemusic 
              className='h-[36%] w-[36%] cursor-pointer text-lascent dark:text-dascent' 
              onClick={() => setFile(file)}
            /> 
          }
        </div>
      </div>
      {File != '' && <Player File={File} setFile={setFile} />}
    </div>
  )
}

export default Card