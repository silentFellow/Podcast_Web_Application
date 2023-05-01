import { FC, useState, useRef , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidenav } from '../components'
import { Add } from '../assets'
import { podcast } from '../contexts'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { uid } from 'uid'
import { Line } from 'rc-progress'

const CreatePod: FC = () => {

  const [poster, setPoster] = useState<any>('')
  const [file, setFile] = useState<any>('')
  const [category, setCategory] = useState<string>('audio')
  const title = useRef()
  const author = useRef()
  const description = useRef()

  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const [imgSize, setImgSize] = useState<number>(0)
  const [fileSize, setFileSize] = useState<number>(0)
  const [uploadedSize, setUploadedSize] = useState<number>(0)
  const [totalSize, setTotalSize] = useState<number>(0)
  const [percentage, setPercentage] = useState<number>(0)
  let imageUrl: string
  let fileUrl: string

  const { createPod, docPercentage } = podcast()
  
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
      setMessage('Please Wait While Uploading')

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
        const fileRef = ref(storage, `${newId}`)
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
          const imaageRef = ref(storage, `${uniqueId}`)
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
    <div>
      <Sidenav  btn={'Back To Home'} link={'/explore'} />
      <div className="CreatePodc">
        <h2>Create PodCast</h2>

        <div className="UploadPost">
          <h3>Upload Thumbnail</h3>
          <div className="Poster">
            <label htmlFor='posterInput'>
              <img src={Add} alt="" className='cover' />
            </label>
            <input type='file' className='hidden' id='posterInput' accept='image/*' onChange={(e) => {
              setPoster(e.target.files[0]) 
              setImgSize(e.target.files[0].size)
            }} disabled={loading} />
          </div>

          <div className="author">
            <h4>PodCast Name</h4>
            <div className="emailContainer"><input type="text" placeholder="PodCastName" className="emailid" ref={title} /></div>
          </div>
          <div className="author">
            <h4>Author Name</h4>
            <div className="emailContainer"><input type="text" placeholder="AuthorName" className="emailid" ref={author} /></div>
          </div>
          <div className="author">
            <h4>PodCast Description</h4>
            <div className="emailContainer"><textarea type="text" placeholder="Description" className="emailid" defaultValue='' ref={description} rows={6} cols={12} /></div>
          </div>
          <div className={'author'}>
            <h4>Category</h4>

            <div style={{ display: "flex", marginTop: "10px" }}>
              <label className="form-control">
                <input type="radio" name="radio" value='video' 
                  onClick={(e) => setCategory(e.target.value)}
                  disabled={loading}
                />
                Video
              </label>
              <label className="form-control">
                <input type="radio" name="radio" value='audio' defaultChecked
                  onClick={(e) => setCategory(e.target.value)}
                  disabled={loading}
                />
                Audio
              </label>
            </div>
            <div className="author" style={{marginTop:"30px"}}>
              <h4>Upload File</h4>
              <div className="emailContainer"><input type="file" size={60} placeholder="AuthorName" className="emailid" defaultValue=''
                onChange={(e) => {
                  setFile(e.target.files[0])
                  setFileSize(e.target.files[0].size)
                }}
                accept={`${category == 'audio' ? 'audio/*' : 'video/*'}`} 
                disabled={loading}
              /></div>
            </div>

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
              <button type='submit' className="savebtn" onClick={() => publish()} disabled={loading} >Publish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePod