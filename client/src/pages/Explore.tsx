import { FC, useState, Dispatch, SetStateAction } from 'react'
import { SideBar, ShowCollection } from '../components'
import { category } from '../constants/category'

interface Props {
  theme: string, 
  setTheme: Dispatch<SetStateAction<'dark' | 'light'>>
}

const Explore: FC<Props> = ({ theme, setTheme }) => {

  const [active, setActive] = useState<string>(category[0].key)
  const [showSideBar, setShowSideBar] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div className="min-h-screen w-screen flex bg-lprimary dark:bg-dprimary text-lsecondary dark:text-dsecondary">
      <SideBar theme={theme} active={active} setActive={setActive} showSideBar={showSideBar} setShowSideBar={setShowSideBar} setShowMenu={setShowMenu} />
      <ShowCollection theme={theme} setTheme={setTheme} showSideBar={showSideBar} setShowSideBar={setShowSideBar} search={search} setSearch={setSearch} active={active} showMenu={showMenu} setShowMenu={setShowMenu} />
    </div>
  )
}

export default Explore