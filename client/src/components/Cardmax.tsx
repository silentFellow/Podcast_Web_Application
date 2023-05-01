import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { podcast } from '../contexts'

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
    const { deletePod } = podcast()

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
        navigate('/update')
    }

    const remove = async () => {
        await deletePod(id)
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
                    <button className="follow"
                        onClick={() => remove()}
                    >delete</button>
                </div>
            </div>
            
        </div>
    )
}

export default Cardmax