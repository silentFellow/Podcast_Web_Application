import { FC, Dispatch, SetStateAction } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { LogoDark, LogoLight } from '../assets'
import { category } from '../constants/category'

interface Props {
  active: string, 
  theme: string, 
  setActive: Dispatch<SetStateAction<string>>, 
  showSideBar: boolean, 
  setShowSideBar: Dispatch<SetStateAction<boolean>>, 
  setShowMenu: Dispatch<SetStateAction<boolean>>
}

const ShowCollection: FC<Props> = ({ theme, active, setActive, showSideBar, setShowSideBar, setShowMenu }) => {

  return (
    <div className={`${!showSideBar ? 'hidden h-screen w-screen sm:min-h-screen sm:w-[27rem] sm:flex flex-col items-start p-[3rem] bg-lbg dark:bg-dbg sticky top-0' : "h-screen w-screen sm:min-h-screen sm:w-[27rem] flex flex-col items-start p-[3rem] bg-lbg dark:bg-dbg sticky top-0"}`}>
      <div className="w-full flex justify-between">
        <img 
          src={theme == 'dark' ? LogoLight : LogoDark} 
          alt="logo"
          className='h-[2.4rem]'
        />

        <AiOutlineClose 
          className='block text-[2.4rem] cursor-pointer sm:hidden' 
          onClick={() => setShowSideBar(false)}
        />
      </div>

      <div className="mt-6">
        {category.map(category => {
          return (
            <li 
              key={category.key} 
              className={`${category.key == active ? 
                'list-none w-full mt-9 cursor-pointer text-[2.4rem] font-space hover:opacity-60 duration-[3] text-lsecondary font-black dark:text-dsecondary sm:text-[2.1rem]'
                 : 
                'list-none w-full mt-9 cursor-pointer text-[2.4rem] font-space hover:opacity-60 duration-[3] text-lascent dark:text-dascent sm:text-[2.1rem]'}`}
              onClick={() => {
                setActive(category.key)
                setShowSideBar(false) 
                setShowMenu(false)
              }}
            >{category.title}</li>
          )
        })}
      </div>

      <button 
        className='font-black w-1/2 mt-6 p-3 mx-auto rounded-xl bg-lascent dark:bg-dascent text-lprimary dark:text-dprimary hover:opacity-70'
      >
        <Link to={'/create'}>UPLOAD</Link>
      </button>
    </div>
  )
}

export default ShowCollection