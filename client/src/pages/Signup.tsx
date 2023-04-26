import { FC, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Google, Apple } from '../assets/'
import { FaFacebookF } from 'react-icons/fa'
import { user } from '../contexts/users'

const Signup: FC = () => {

  const [loading, setLoading] = useState<boolean>(false)

  const firstName = useRef()
  const lastName = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const [_, setCookies] = useCookies()
  const [message, setMessage]= useState<string>('')
  const navigate = useNavigate()

  const { signup, googleLogin, login } = user()

  const SignUp = async () => {
    setMessage('')
    if(firstName.current.value == '' || password.current.value == '') {
      return setMessage("Enter a valid details")
    }
    if(password.current.value != confirmPassword.current.value) {
      return setMessage('Passwords do no match')
    }

    setLoading(true)
    const name = firstName.current.value + lastName.current.value || ''
    try {
      setMessage('Please Wait')
      const res = await signup(name, password.current.value)
      if(res.status != 200) {
        setMessage(res)
      }
      else {
        navigate('/login')
      }
    }
    catch(err) {
      console.log(err)
      setMessage('something went wrong')
    }
    setLoading(false)
  }

  const google = async (): Promise<string | void> => {
    setMessage('')
    setLoading(true)
    try {
      await googleLogin()
      const userName = localStorage.getItem('name')
      const password = localStorage.getItem('pass')
      const res = await login(userName, password, true)
      if(res.status != 200) {
        const res = await signup(userName, password, true)
        if(res.status != 200) {
          setMessage('something went wrong')
        }
        else {
          const res = await login(userName, password, true)
          if(res.status == 200) {
            setCookies('access_token', res.data.access_token)
            localStorage.setItem('userCred', res.data)
            navigate('/explore')
          }
        }
      }
      else {
        setCookies('access_token', res.data.access_token)
        localStorage.setItem('userCred', res.data)
        navigate('/explore')
      }
    }
    catch(err) {
      console.log(err)
      setMessage('something went wrong')
    }
    setLoading(false)
  }

  return(
  <div className="signdiv">
    <h3 className="start">Start your Podcast Journey</h3>
    <h2 className="create">Create new account</h2>

    <h4 style={{color:'gray',marginTop:'10px'}}>Already a member? <Link to='/login'>login</Link></h4>

    <div className="signupinput">
    <div className={message == '' ? 'hidden' : "emailpass my p"}>
      <div className="emailContainer center">{message}</div>
    </div>

    {/* input */}
    <div className="name">
      <div className="nameContainer"><input placeholder='First Name' type="text" className="first" ref={firstName} defaultValue='' /></div>
      <div className="nameContainer"><input type="text" placeholder="Last Name" className="last" ref={lastName} defaultValue='' /></div>
    </div>
    <div className="emailpass">
      <div className="emailContainer"><input type="password" placeholder="password" className="emailid" ref={password} defaultValue='' /></div>
      <div className="emailContainer"><input type="password" placeholder="confirm password" className="emailid" ref={confirmPassword} defaultValue='' /></div>
    </div>
    </div>
    <div>
     <button className="createacc" disabled={loading} onClick={() => SignUp()}>Create account</button>

     <h3 style={{marginLeft:'135px',marginTop:'20px'}}>Other Credentials</h3>
     </div>

     <div className="othercred">
    <div className="circle"><img src={Google} height={'30px'} width={'30px'} alt="" onClick={() => google()} /></div>
    <div className="circle"><img src={Apple} height={'28px'} width={'28px'} alt="" /></div>
    <div className="circle"><FaFacebookF height={'30px'} width={'30px'} color={'red'} /></div>
     </div>
  </div>
  )
}

export default Signup