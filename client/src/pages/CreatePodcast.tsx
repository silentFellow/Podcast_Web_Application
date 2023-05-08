import { FC, useRef, useState, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { podcast } from '../contexts'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { uid } from 'uid'
import { Line } from 'rc-progress'

const CreatePodcast: FC = () => {

  const navigate = useNavigate()

  const title = useRef<any>()
  const author = useRef<any>()
  const description = useRef<any>()
  const [category, setCategory] = useState<string>('audio')
  const [poster, setPoster] = useState<any>('')
  const [posterPreview, setPosterPreview] = useState<any>('')
  const [file, setFile] = useState<any>('')
  const [filePreview, setFilePreview] = useState<any>('')

  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [imgSize, setImgSize] = useState<number>(0)
  const [fileSize, setFileSize] = useState<number>(0)
  const [uploadedSize, setUploadedSize] = useState<number>(0)
  const [totalSize, setTotalSize] = useState<number>(0)
  const [percentage, setPercentage] = useState<number>(0)
  let imageUrl: string
  let fileUrl: string

  const { createPod, docPercentage }: any = podcast()
  const userName: string = JSON.parse(localStorage.getItem('userCred') || '')?.userName

  useEffect(() => {
    const per = Math.round((((uploadedSize * 100) / totalSize) * 0.96) + (docPercentage * 0.04))
    setPercentage(per)
  }, [uploadedSize, docPercentage])

  const publish = async () => {
    if(title?.current?.value == '' || description?.current?.value == '' || author?.current?.value == '' || file == '') {
      return setMessage('Enter Required Details')
    }
    try {
      setLoading(true)
      setMessage('Please Wait, Uploading')

      setTotalSize(fileSize + imgSize)
      const docUpload = async () => {
        const res = await createPod(
          title?.current?.value, 
          description?.current?.value, 
          category, 
          author?.current?.value, 
          imageUrl, 
          fileUrl
        )
        console.log(res)
        if(res.status != 200) {
          setMessage('something went wrong')
        }
        else {
          setMessage('Uploaded Successfully')
          navigate('/explore')
        }
      }

      const fileUpload = async () => {
        const newId = uid(36)
        const fileRef = ref(storage, `${userName}/${newId}`)
        const fileUp =  uploadBytesResumable(fileRef, file)
        fileUp.on('state_changed', 
          (snap) => setUploadedSize(uploadedSize + snap.bytesTransferred), 
          (err) => console.log(err), 
          async () => {
            const res = await getDownloadURL(fileUp.snapshot.ref)
            fileUrl = res
            docUpload()
          }
        )
      }

      const imgUpload = async () => {
        if(poster == '') {
          fileUpload()
        }
        else {
          const uniqueId = uid(36)
          const imaageRef = ref(storage, `${userName}/${uniqueId}`)
          const imageUp = uploadBytesResumable(imaageRef, poster)
          imageUp.on('state_changed', 
            (snap) => setUploadedSize(uploadedSize + snap.bytesTransferred), 
            (err) => console.log(err), 
            async () => {
              const res = await getDownloadURL(imageUp.snapshot.ref)
              imageUrl = res
              fileUpload()
            }
          )
        }
      }

      imgUpload()
    }
    catch(err) {
      console.log(err)
      setMessage('something went wrong')
    }
    finally {
      setLoading(false)
      setUploadedSize(0)
      setPercentage(0)
    }
  }

  return (
    <div className="min-h-screen w-screen bg-lprimary text-lsecondary dark:bg-dprimary dark:text-dsecondary">
      <div className="min-h-screen w-screen sm:min-w-[64rem] sm:max-w-5xl mx-auto flex flex-col p-[3rem]">
        <div className="flex justify-between items-center">
          <h3 className="font-bold font-pacifico text-[3rem] text-lsecondary dark:text-dsecondary">Upload Your Podcast</h3>
          <AiOutlineClose 
            className='font-black text-[2.1rem] cursor-pointer' 
            onClick={() => navigate('/explore')}
          />
        </div>

        <div className="mt-12">
          <h3 className="text-[2.1rem]">Podcast Name: </h3>
          <input type="text" 
            className='w-full mt-3 p-4 px-6 rounded-xl outline-none bg-lbg dark:dbg text-lascent dark:text-dacent' 
            placeholder='Enter Podcast Name...' 
            ref={title}
          />
        </div>

        <div className="mt-12">
          <h3 className="text-[2.1rem]">Author Name: </h3>
          <input type="text" 
            className='w-full mt-3 p-4 px-6 rounded-xl outline-none bg-lbg dark:dbg text-lascent dark:text-dacent' 
            placeholder='Enter Author Name...' 
            ref={author}
          />
        </div>

        <div className="mt-12">
          <h3 className="text-[2.1rem]">Description: </h3>
          <textarea 
            className='w-full mt-3 p-4 px-6 rounded-xl outline-none bg-lbg dark:dbg text-lascent dark:text-dacent' 
            placeholder='Enter Author Name...' 
            rows={9} 
            ref={description}
          />
        </div>

        <div className="mt-12">
          <h3 className="text-[2.1rem]">Category: </h3>
          <select name="category"
            className='w-1/2 cursor-pointer mt-3 p-4 px-6 rounded-xl outline-none bg-lbg dark:dbg text-lascent dark:text-dacent' 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
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

              setPoster(e.target.files![0])
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

        <div className="mt-12">
          <h3 className="text-[2.1rem]">{category}: </h3>
          <input type="file" 
            accept={`${category == 'audio' ? 'audio/*' : 'video/*'}`} 
            id='video' 
            className='hidden' 
            onChange={(e) => {
              let reader = new FileReader()
              reader.readAsDataURL(e.target?.files![0])
              reader.onload = () => {
                setFilePreview(reader.result)
              }

              setFile(e.target.files![0])
              setFileSize(e.target.files![0].size)
            }}
          />
          <div className="h-[21rem] w-[21rem] rounded-xl mt-2 flex justify-center items-center cursor-pointer border-2 border-lsecondary dark:border-dsecondary">
            <label htmlFor="video">
              {filePreview == '' ? 
                <BiImageAdd
                  className='text-[15rem] cursor-pointer' 
                /> : 
                <video 
                  src={filePreview} 
                  autoPlay 
                  muted
                  className='h-full w-full'
                />
              }
            </label>
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
              onClick={() => publish()}
              disabled={loading}
            >UPLOAD</button>
          </div>

        </div>        
      </div>
    </div>
  )
}

export default CreatePodcast