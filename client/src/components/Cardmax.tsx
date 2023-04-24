import { FC, useState } from 'react'
import { user } from '../contexts/users'
import { Link, useNavigate } from 'react-router-dom'
import { Createpod } from '../pages'

interface Props {
    author: string, 
    title: string, 
    file: string, 
    setUrl: Dispatch<string>, 
    setAudio: Dispatch<string>, 
    id: string, 
    poster: string, 
    description: string
}

const Cardmax: FC<Props> = ({ author, title, file, setUrl, poster, id, description }) =>{

    const navigate = useNavigate()

    const edit = () => {
        const details = {
            author: author, 
            title: title, 
            file: file, 
            poster: poster, 
            id: id, 
            description: description, 
            update: true
        }
        localStorage.setItem('favAdd', JSON.stringify(details))
        navigate('/create')
    }

    return (

        <div className="Cardmax">
            <div className="Desc">
                <div className="head">
                    <h4>{author}</h4>
                    <h3>{title}</h3>
                </div>
                <div className="button">
                    <button className="play"
                        onClick={() => {
                            setUrl(file)
                        }}
                    >Play Now</button>
                    <button className="follow"
                        onClick={() => edit()}
                    >Edit</button>
                </div>
            </div>
            
        </div>
    )
}

export default Cardmax