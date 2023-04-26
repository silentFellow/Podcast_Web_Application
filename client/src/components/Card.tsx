import { FC, useEffect, useState } from 'react'
import cardposter from "../assets/cardPoster.jpg"
import profile from "../assets/profile.png"
import Play from '../assets/playImg.png'
import { category } from '../constants/category'
import { user } from '../contexts/users'
import PodcastApi from '../api/register'
import like from "../assets/like.png"

interface Props {
    poster: string, 
    author: string, 
    date: string, 
    title: string, 
    file: string, 
    setUrl: Dispatch<string>, 
    setAudio: Dispatch<string>
}

const Card: FC<Props> = ({ poster, author, title, date, file, setUrl, setAudio, description }) => {

    const { prof } = user()
    const [getCurrentUser, setGetCurrentUser] = useState<any>([{}])
    useEffect(() => {
        const data = async () => {
            const dt = await prof()
            setGetCurrentUser(dt.data)
        }
        data()
    }, [])
    
    const liked = async () => {
        try {
            const newRes = await PodcastApi.post('/register/update', {
                uid: getCurrentUser._id, 
                newCollection: {
                  title: title, 
                  description: description, 
                  author: author, 
                  authorId: getCurrentUser.uid, 
                  posterURL: poster, 
                  fileURL: file
                }, 
                category: 'fav'
            })
            console.log('liked')
        }
        catch(err) {
            console.log(err)
        }
    }
    

    return (

        <div className="Card">
            <div className="round sphere">
                <img src={Play} alt="" className="profileimg" 
                    onClick={() => {
                        setUrl(file)
                        setAudio(category)
                    }}
                />
                <img src={like} alt="" className='like' height={25} width={30} 
                    onClick={() => liked()}
                />

            </div>
            <img src={cardposter == '' ? profile : poster}  className="cardposter" loading='lazy'  />
            <div className="CardDesc">
                <h5>{author}</h5>
                <h4>{title}</h4>
                <h6>{date}</h6>
            </div>
        </div>
    )
}

export default Card