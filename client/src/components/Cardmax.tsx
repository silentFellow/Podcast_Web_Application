import { FC } from 'react'
import { category } from '../constants/category'

interface Props {
    author: string, 
    title: string, 
    file: string, 
    setUrl: Dispatch<string>, 
    setAudio: Dispatch<string>
}

const Cardmax: FC<Props> = ({ author, title, file, setUrl, setAudio }) =>{

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
                    <button className="follow">Follow</button>
                </div>
            </div>
            
        </div>
    )
}

export default Cardmax