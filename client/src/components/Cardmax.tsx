import { FC } from 'react'

interface Props {
    author: string, 
    title: string, 
    file: string
}

const Cardmax: FC<Props> = ({ author, title, file }) =>{

    return (

        <div className="Cardmax">
            <div className="Desc">
                <div className="head">
                    <h4>{author}</h4>
                    <h3>{title}</h3>
                </div>
                <div className="button">
                    <button className="play">Play Now</button>
                    <button className="follow">Follow</button>
                </div>
            </div>
            
        </div>
    )
}

export default Cardmax