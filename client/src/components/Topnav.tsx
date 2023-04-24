import { FC } from 'react'
import { user } from "../contexts/users"

interface Props {
  setSearch: Dispatch<string>,
}

const Topnav: FC<Props> = ({ setSearch }) => {

    const { signout } = user()

  return (
    <div className="topnav">
      <div className="logodiv">
         <h3 className="logo">Silent Podcast</h3>
      </div>
      <div className="Searchbar">
        <input className="searchinput" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      </div>

      <h4>
        <button className="signout" 
            onClick={() => signout()}
        >Signout</button>
      </h4>
    </div>
  )
}

export default Topnav