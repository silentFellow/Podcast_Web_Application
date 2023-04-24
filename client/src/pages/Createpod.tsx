import { FC, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PodcastApi from '../api/register'
import { Sidenav } from '../components'
import { Add } from '../assets'
import { user } from '../contexts/users'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { uid } from 'uid'

const Createpod: FC = () => {

  const [poster, setPoster] = useState<any>()
  const [file, setFile] = useState<any>()
  const [audio, setAudio] = useState<boolean>(true)
  const title = useRef()
  const author = useRef()
  const description = useRef()
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { getCurrentUser } = user()

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

      const res = await PodcastApi.post('/podcast/post', {
        title: title?.current?.value, 
        description: description?.current?.value, 
        category: audio ? 'audio' : 'false', 
        author: author?.current?.value, 
        authorId: getCurrentUser().uid,
        posterURL: imageUrl, 
        fileURL: fileUrl
      })
      if(res.status != 200) {
        setMessage(res.data)
      }
    }
    catch(err) {
      console.log(err)
      setMessage('something went wrong')
    }

    try {
      const res = await PodcastApi.post('/register/update', {
        uid: getCurrentUser().uid, 
        newCollection: {
          title: title?.current?.value, 
          description: description?.current?.value, 
          category: audio ? 'audio' : 'false', 
          author: author?.current?.value, 
          authorId: getCurrentUser().uid,
          posterURL: imageUrl, 
          fileURL: fileUrl
        }
      })
      if(res.status != 200) {
        setMessage(res.data)
      }
      else {
        setMessage(res.data)
        navigate('/explore')
      }
    }
    catch(err) {
      console.log(err)
      setMessage('something went wrong')
    }
    setLoading(false)
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
            <input type='file' className='hidden' id='posterInput' onChange={(e) => {
              setPoster(e.target.files[0])
            }} />
          </div>

          <div className="author">
            <h4>PodCast Name</h4>
            <div className="emailContainer"><input type="text" placeholder="PodCastName" className="emailid" ref={title} defaultValue='' /></div>
          </div>
          <div className="author">
            <h4>Author Name</h4>
            <div className="emailContainer"><input type="text" placeholder="AuthorName" className="emailid" ref={author} defaultValue='' /></div>
          </div>
          <div className="author">
            <h4>PodCast Description</h4>
            <div className="emailContainer"><textarea type="text" placeholder="Description" className="emailid" defaultValue='' ref={description} rows={6} cols={12} /></div>
          </div>
          <div className="author">
            <h4>Category</h4>

            <div style={{ display: "flex", marginTop: "10px" }}>
              <label className="form-control">
                <input type="radio" name="radio" value='video' 
                  onClick={() => setAudio(false)}
                />
                Video
              </label>
              <label className="form-control">
                <input type="radio" name="radio" value='audio' checked={audio} 
                  onClick={() => setAudio(true)}
                />
                Audio
              </label>
            </div>
            <div className="author" style={{marginTop:"30px"}}>
              <h4>Upload File</h4>
              <div className="emailContainer"><input type="file" size={60} placeholder="AuthorName" className="emailid" defaultValue=''
                onChange={(e) => setFile(e.target.files[0])}
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

export default Createpod