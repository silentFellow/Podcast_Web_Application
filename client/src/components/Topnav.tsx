import { user } from "../contexts/users"

const Topnav = () => {

    const { signout } = user()

  return (
    <div className="topnav">
      <div className="logodiv">
         <h3 className="logo">Silent Podcast</h3>
      </div>
      <div className="Searchbar">
        <input className="searchinput" type="text" placeholder="Search"/>
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