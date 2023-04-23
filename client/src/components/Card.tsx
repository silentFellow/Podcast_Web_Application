import { FC } from 'react'
import cardposter from "../assets/cardPoster.jpg"
import profile from "../assets/profile.png"

interface Props {
    poster: string, 
    author: string, 
    date: string, 
    title: string, 
    file: string
}

const Card: FC<Props> = ({ poster, author, title, date }) => {

    return (

        <div className="Card">
            <div className="round sphere">
                <img src={poster} alt="" className="profileimg" />
            </div>
            <img src={cardposter == '' ? profile : poster}  className="cardposter"  />
            <div className="CardDesc">
                <h5>{author}</h5>
                <h4>{title}</h4>
                <h6>{date}</h6>
            </div>
        </div>
    )
}

export default Card