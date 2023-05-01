import { FC, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidenav } from '../components'
import { Add } from '../assets'
import { podcast } from '../contexts'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { uid } from 'uid'

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
  const [imgPercentage, setImgPercentage] = useState<string>('')
  const [filePercentage, setFilePercentage] = useState<string>('')
  const { createPod, docPercentage } = podcast()

  const publish = async () => {
    if(title?.current?.value == '' || description?.current?.value == '' || author?.current?.value == '' || file == '') {
      return setMessage('Enter Required Details')
    }
    try {
      setLoading(true)
      setMessage('Please Wait While Uploading')
      const uniqueId = uid(36)
      const imaageRef = ref(storage, `${uniqueId}`)
      await uploadBytes(imaageRef, poster)
      const imageUrl = await getDownloadURL(imaageRef)

      const newId = uid(36)
      const fileRef = ref(storage, `${newId}`)
      await uploadBytes(fileRef, file)
      const fileUrl = await getDownloadURL(fileRef)

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
    catch(err) {
      console.log(err)
      setMessage('something went wrong')
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
            }} />
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
                />
                Video
              </label>
              <label className="form-control">
                <input type="radio" name="radio" value='audio' defaultChecked
                  onClick={(e) => setCategory(e.target.value)}
                />
                Audio
              </label>
            </div>
            <div className="author" style={{marginTop:"30px"}}>
              <h4>Upload File</h4>
              <div className="emailContainer"><input type="file" size={60} placeholder="AuthorName" className="emailid" defaultValue=''
                onChange={(e) => setFile(e.target.files[0])}
                accept={`${category == 'audio' ? 'audio/*' : 'video/*'}`}
              /></div>
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