import cardposter from "../assets/cardPoster.jpg"
import profile from "../assets/profile.png"

const Card = () => {

    return (

        <div className="Card">
            <div className="round sphere">
                <img src={profile} alt="" className="profileimg" />
            </div>
            <img src={cardposter}  className="cardposter"  />
            <div className="CardDesc">
                <h5>Author Name</h5>
                <h4>PodCast Name</h4>
                <h6>2 Weeks ago</h6>
            </div>
        </div>
    )
}

export default Card