import { FC } from 'react'
import ReactPlayer from 'react-player'

interface Props {
  url: string, 
  audio: boolean
}

const Player: FC<Props> = ({ url, audio }) => {
  return (
      <div className="player_wrapper">
        <div className="player">
          <ReactPlayer 
            url={url}
            controls={true}
            light={audio} 
            height={'660px'}
            width={'450px'}
            playing={true}
          />
        </div>
      </div>
  )
}

export default Player