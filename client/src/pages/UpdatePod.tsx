import { FC, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidenav } from '../components'
import { Add } from '../assets'
import { podcast } from '../contexts'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { uid } from 'uid'
import { Line } from 'rc-progress'

const UpdatePod: FC = () => {

  const [data, setData] = useState([])
  const [poster, setPoster] = useState<string>('')
  const title = useRef()
  const author = useRef()
  const description = useRef()

  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  
  const [imgSize, setImgSize] = useState<number>(0)
  const [uploadedSize, setUploadedSize] = useState<number>(0)
  const [totalSize, setTotalSize] = useState<number>(0)
  const [percentage, setPercentage] = useState<number>(0)
  let imageUrl: string

  const { updatePod, docPercentage } = podcast()

  useEffect(() => {
    const dt = localStorage.getItem('favAdd')
    if(!dt) {
      navigate('/explore')
    }
    const details = JSON.parse(dt)
    setData(details)
    imageUrl = data?.poster
  }, [])

  useEffect(() => {
    const per = Math.round((((uploadedSize * 100) / totalSize) * 0.96) + (docPercentage * 0.04))
    setPercentage(per)
  }, [uploadedSize, docPercentage])

  const update = async () => {
    if(title?.current?.value == '' || description?.current?.value == '' || author?.current?.value == '') {
      return setMessage('Enter Required Details')
    }
    try {
      setLoading(true)
      setMessage('Please Wait While Uploading')

      setTotalSize(imgSize)
      const docUpload = async () => {
        const res = await updatePod(
          data?.id, 
          title?.current?.value, 
          description?.current?.value, 
          author?.current?.value, 
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
        if(data?.poster == poster) {
          docUpload()
        }
        else {
          const uniqueId = uid(36)
          const imaageRef = ref(storage, `${uniqueId}`)
          const imageUp = uploadBytesResumable(imaageRef, poster)
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
    <div>
      <Sidenav  btn={'Back To Home'} link={'/explore'} />
      <div className="CreatePodc">
        <h2>Update PodCast</h2>

        <div className="UploadPost">
          <h3>Update Thumbnail</h3>
          <div className="Poster">
            <label htmlFor='posterInput'>
              <img src={data?.poster != '' ? data?.poster : Add} alt="" className='cover' />
            </label>
            <input type='file' className='hidden' id='posterInput' accept='image/*' onChange={(e) => {
                setPoster(e.target.files[0]) 
                setImgSize(e.target.files[0].size)
              }} 
              disabled={loading} 
              defaultValue={data?.poster}
            />
          </div>

          <div className="author">
            <h4>PodCast Name</h4>
            <div className="emailContainer"><input type="text" placeholder="PodCastName" className="emailid" ref={title} 
              defaultValue={data?.title != '' && data?.title}
            /></div>
          </div>
          <div className="author">
            <h4>Author Name</h4>
            <div className="emailContainer"><input type="text" placeholder="AuthorName" className="emailid" ref={author} 
              defaultValue={data?.author != '' && data?.author}
            /></div>
          </div>
          <div className="author">
            <h4>PodCast Description</h4>
            <div className="emailContainer"><textarea type="text" placeholder="Description" className="emailid" ref={description} rows={6} cols={12} 
              defaultValue={data?.description}
            /></div>
          </div>
          <div className={'author'}>

            <div className={`${percentage == 0 || isNaN(percentage) ? 'hidden' : 'block percentage'}`}>
              <Line 
                percent={percentage}
                strokeColor='#808080'
                strokeWidth={5}
                trailColor='#f5f5f5'
              />
              <h3>{percentage}%</h3>
            </div>
            <div className="author">
              <div className={`${message != '' ? "emailContainer message" : 'hidden'}`} >{message}</div>
            </div>
            <div className="publish">
              <button type='submit' className="savebtn" onClick={() => update()} disabled={loading} >Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatePod