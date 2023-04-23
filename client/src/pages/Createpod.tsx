import { FC, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PodcastApi from '../api/register'
import { Sidenav } from '../components'
import { Add } from '../assets'
import { user } from '../contexts/users'

const Createpod: FC = () => {

  const { currentUser } = user()

  const [poster, setPoster] = useState<string>('')
  const [file, setFile] = useState<string>('')
  const title = useRef()
  const author = useRef()
  const description = useRef()
  const category = useRef()
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate()

  const publish = async () => {
    console.log(currentUser)
    if(title.current.value == '' || description.current.value == '' || category.current.value == '' || author.current.value == '' || file == '') {
      return setMessage('Enter Required Details')
    }
    const res = await PodcastApi.post({
      title: title.current.value, 
      description: description.current.value, 
      category: category.current.value, 
      author: author.current.value, 
      authorId: currentUser.uid,
      posterURL: '', 
      fileURL: ''
    })
    if(res.status != 200) {
      setMessage(res.data)
    }
    else {
      setMessage(res.data)
      navigate('/explore')
    }
  }

  return (
    <div>
      <Sidenav />
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
            <div className="emailContainer"><input type="text" placeholder="PodCastName" className="emailid" defaultValue='' /></div>
          </div>
          <div className="author">
            <h4>Author Name</h4>
            <div className="emailContainer"><input type="text" placeholder="AuthorName" className="emailid" defaultValue='' /></div>
          </div>
          <div className="author">
            <h4>PodCast Description</h4>
            <div className="emailContainer"><textarea type="text" placeholder="Description" className="emailid" defaultValue='' rows={6} cols={12} /></div>
          </div>
          <div className="author">
            <h4>Category</h4>

            <div style={{ display: "flex", marginTop: "10px" }}>
              <label className="form-control">
                <input type="radio" name="radio" value='video' />
                Video
              </label>
              <label className="form-control">
                <input type="radio" name="radio" value='audio' checked />
                Audio
              </label>
            </div>
            <div className="author" style={{marginTop:"30px"}}>
              <h4>Upload File</h4>
              <div className="emailContainer"><input type="file" size={60} placeholder="AuthorName" className="emailid" defaultValue=''
                onChange={(e) => setFile(e.target.files[0])}
              /></div>
            </div>

            <div className="publish">
              <button type='submit' className="savebtn" onClick={() => publish()} >Publish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Createpod