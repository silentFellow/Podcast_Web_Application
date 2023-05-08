import { Dispatch, FC, SetStateAction } from 'react'
import { default as  _ReactPlayer } from 'react-player'
import { ReactPlayerProps } from 'react-player/types/lib'
import { AiOutlineClose } from 'react-icons/ai'

interface Props {
  File: string, 
  setFile: Dispatch<SetStateAction<string>>
}

const Player: FC<Props> = ({ File, setFile }) => {

  const ReactPlayer = _ReactPlayer as unknown as FC<ReactPlayerProps>

  return (
    <div className="min-h-screen w-screen flex justify-center items-center fixed top-0 left-0 z-20 bg-black">
      <div className="h-full w-full relative">
        <ReactPlayer
          url={File}
          controls={true}
          height={'90vh'} 
          width={'90wh'}
        />

        <AiOutlineClose 
          className='absolute top-[-2.4rem] right-[6rem] font-black text-[2.7rem] text-lbg cursor-pointer' 
          onClick={() => setFile('')}
        />
      </div>
    </div>
  )
}

export default Player