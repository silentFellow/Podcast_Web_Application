import { FC, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineClose } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'
import { SiYoutubemusic } from 'react-icons/si'
import { CiMenuKebab } from 'react-icons/ci'
import { FaPlay } from 'react-icons/fa'
import { podcast, user } from '../contexts'
import { CardPoster } from '../assets'
import { Player } from '.'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Line } from 'rc-progress'
import { uid } from 'uid'

interface Props {
  author: string, 
  title: string, 
  category: string, 
  description: string, 
  poster: string,  
  file: string, 
  id: string
}

const CollectionCard: FC<Props> = ({ author, title, category, description, poster, file, id }) => {

  const { updatePod, docPercentage, deletePod }: any = podcast()
  const userName: string = JSON.parse(localStorage.getItem('userCred') || '')?.userName
  const { updateProf }: any = user()

  const [File, setFile] = useState<string>('')
  const [showUpdateMenu, setShowUpdateMenu] = useState<boolean>(false)
  const [update, setUpdate] = useState<boolean>(false)

  const titleRef = useRef<any>()
  const authorRef = useRef<any>()
  const descriptionRef = useRef<any>()
  const [posterUpdate, setPosterUpdate] = useState<any>(poster)
  const [posterPreview, setPosterPreview] = useState<any>('')

  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [imgSize, setImgSize] = useState<number>(0)
  const [uploadedSize, setUploadedSize] = useState<number>(0)
  const [percentage, setPercentage] = useState<number>(0)
  let imageUrl: string

  const navigate = useNavigate()

  useEffect(() => {
    const per = Math.round((((uploadedSize * 100) / imgSize) * 0.96) + (docPercentage * 0.04))
    setPercentage(per)
  }, [uploadedSize, docPercentage])

  const updateit = async () => {
    if(titleRef?.current?.value == '' || descriptionRef?.current?.value == '' || authorRef?.current?.value == '') {
      return setMessage('Enter Required Details')
    }
    try {
      setLoading(true)
      setMessage('Please Wait, Uploading')

      const docUpload = async () => {
        const res = await updatePod(
          id, 
          titleRef?.current?.value, 
          descriptionRef?.current?.value, 
          authorRef?.current?.value, 
          imageUrl
        )
        if(res.status != 200) {
          setMessage(res.data)
        }
        else {
          setMessage(res.data)
          navigate('/explore')
        }
      }

      const imgUpload = async () => {
        if(posterUpdate == poster) {
          docUpload()
        }
        else {
          const uniqueId = uid(36)
          const imaageRef = ref(storage, `${userName}/${uniqueId}`)
          const imageUp = uploadBytesResumable(imaageRef, posterUpdate)
          imageUp.on('state_changed', 
            (snap) => setUploadedSize(uploadedSize + snap.bytesTransferred), 
            (err) => console.log(err), 
            async () => {
              const res = await getDownloadURL(imageUp.snapshot.ref)
              imageUrl = res
              docUpload()
            }
          )
        }
      }

      imgUpload()
      setShowUpdateMenu(false)
    }
    catch {
      setMessage('Something went wrong')
    }
    finally {
      setLoading(false)
      setUploadedSize(0)
      setPercentage(0)
    }
  }

  return (
    <div className="relative mb-9 flex">
      <div className="h-[9rem] w-full p-6 px-9 flex justify-between items-center rounded-xl z-0 bg-lbg dark:bg-dbg lg:w-[60%]">
        <div className="h-full w-[70%] flex items-center">
          <img 
            src={poster != '' ? poster : CardPoster} 
            alt="Missing" 
            className='h-[4.5rem] w-[4.5rem] sm:h-[7.2rem] sm:w-[7.2rem]' 
          />

          <div className="ml-[1.5rem] sm:ml-[2.1rem] flex flex-col justify-betweenr">
            <h2 className="text-[1.5rem] sm:text-[1.8rem] text-lsecondary dark:text-dsecondary whitespace-nowrap overflow-hidden text-ellipsis">{title}</h2>
            <h3 className="text-[1.2rem] sm:text-[1.5rem] text-lascent dark:text-dascent whitespace-nowrap overflow-hidden text-ellipsis">{author}</h3>
          </div>
        </div>

        <div className="flex justify-center items-center w-[30%]">
          <AiOutlineHeart 
            className='h-[18%] w-[18%] sm:h-[18%] sm:w-[18%] cursor-pointer text-lascent dark:text-dascent hover:opacity-60' 
            onClick={async () => await updateProf(id)}
          />

          { category == 'video' ? 
            <FaPlay 
              className='h-[18%] w-[18%] cursor-pointer mx-6 sm:mx-9 text-lascent dark:text-dascent hover:opacity-60' 
              onClick={() => setFile(file)}
            /> : 
            <SiYoutubemusic 
              className='h-[18%] w-[18%] cursor-pointer mx-6 sm:mx-9 text-lascent dark:text-dascent hover:opacity-60' 
              onClick={() => setFile(file)}
            /> 
          }

          <CiMenuKebab 
            className='h-[15%] w-[15%] cursor-pointer text-lascent dark:text-dascent' 
            onClick={() => setShowUpdateMenu(!showUpdateMenu)}
          />

        </div>
      </div>

      <section className={`${!showUpdateMenu ? 'hidden' : "flex flex-col justify-start p-3 absolute right-[3rem] md:right-[45%] top-[9.6rem] z-10 rounded-3xl font-black text-[1.8rem] menu text-lbg dark:text-dbg"}`}>
        <div className="p-3 px-5 cursor-pointer hover:opacity-70"
          onClick={() => {
            setUpdate(true)
            titleRef.current.value = title
            authorRef.current.value = author
            descriptionRef.current.value = description 
            setPosterUpdate(poster) 
            setPosterPreview(poster)
            setShowUpdateMenu(false)
          }}
        >Edit</div>
        <div className="p-3 px-5 cursor-pointer hover:opacity-70"
          onClick={async () => {
            await deletePod(id)
            setShowUpdateMenu(false)
          }}
        >Delete</div>
      </section>

      {File != '' && <Player File={File} setFile={setFile} />}

      <div className={`${update ? "h-screen w-screen overflow-scroll fixed top-0 left-0 md:relative md:min-h-screen md:w-[40%] bg-lprimary text-lsecondary dark:bg-dprimary dark:text-dsecondary" : 'hidden'}`}>
        <div className="md:min-h-screen w-screen md:w-full mx-auto flex flex-col p-[3rem]">
          <div className="flex justify-between items-center">
            <h3 className="font-bold font-pacifico text-[2.4rem] sm:text-[3rem] text-lsecondary dark:text-dsecondary">Upload Your Podcast</h3>
            <AiOutlineClose 
              onClick={() => setUpdate(false)}
              className='font-black text-[2.1rem] cursor-pointer' 
            />
          </div>

          <div className="mt-12">
            <h3 className="text-[2.1rem]">Podcast Name: </h3>
            <input type="text" 
              className='w-full mt-3 p-4 px-6 rounded-xl outline-none bg-lbg dark:dbg text-lascent dark:text-dacent' 
              placeholder='Enter Podcast Name...' 
              ref={titleRef}
            />
          </div>

          <div className="mt-12">
            <h3 className="text-[2.1rem]">Author Name: </h3>
            <input type="text" 
              className='w-full mt-3 p-4 px-6 rounded-xl outline-none bg-lbg dark:dbg text-lascent dark:text-dacent' 
              placeholder='Enter Author Name...' 
              ref={authorRef}
            />
          </div>

          <div className="mt-12">
            <h3 className="text-[2.1rem]">Description: </h3>
            <textarea 
              className='w-full mt-3 p-4 px-6 rounded-xl outline-none bg-lbg dark:dbg text-lascent dark:text-dacent' 
              placeholder='Enter Author Name...' 
              rows={9} 
              ref={descriptionRef}
            />
          </div>

          <div className="mt-12">
            <h3 className="text-[2.1rem]">Poster: </h3>
            <input type="file" 
              accept='image/*' 
              id='poster' 
              className='hidden' 
              onChange={(e) => {
                let reader = new FileReader()
                reader.readAsDataURL(e.target.files![0])
                reader.onload = () => {
                  setPosterPreview(reader.result)
                }

                setPosterUpdate(e.target.files![0])
                setImgSize(e.target.files![0].size)
              }}
            />

            <div className="h-[21rem] w-[21rem] rounded-xl mt-2 flex justify-center items-center border-2 border-lsecondary dark:border-dsecondary">
              <label htmlFor="poster">
                {posterPreview == '' ? 
                <BiImageAdd
                  className='text-[15rem] cursor-pointer' 
                />  :
                <img 
                  src={posterPreview} 
                  alt="Missing" 
                  className='h-full w-full'
                />
              }
              </label>
            </div>
          </div>

            <div className={`${message != '' ? "w-full mt-12 p-3 px-6 flex justify-between items-center rounded-xl bg-lbg dark:bg-dbg" : 'hidden'}`}>
              <div className="text-ascent dark:text-dascent">{message}</div>
              <div className={`${percentage == 0 || isNaN(percentage) ? 'hidden' : "w-[60%] flex justify-center items-center"}`}>
                <Line 
                  percent={percentage} 
                  strokeWidth={3} 
                  strokeColor={'#121820'} 
                  trailColor={'#f5f5f5'} 
                  className='w-[90%] mr-3'
                />

                <h3>{percentage}%</h3>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <button 
                className='mx-auto mt-6 p-3 px-6 rounded-xl cursor-pointer bg-lascent dark:bg-dascent hover:opacity-90' 
                onClick={() => updateit()}
                disabled={loading}
              >UPDATE</button>
            </div>

          </div>        
        </div>
      </div>
  )
}

export default CollectionCard