import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Cookies, useCookies } from 'react-cookie'
import { Google, Apple } from '../assets'
import { FaFacebookF } from 'react-icons/fa'
import { user } from '../contexts/users'

const Login = () => {

  const { login, googleLogin, signup, users } = user()
  const uname = useRef()
  const password = useRef()
  const [message, setMessage] = useState<string>('')
  const [_, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const signin = async (): Promise<string | void> => {
    setMessage('')
    if(uname.current.value == '' || password.current.value == '') {
      return setMessage('Enter details')
    }
    else {
      try {
        const res = await login(uname.current.value, password.current.value)
        if(res.status != 200) {
          setMessage(res.data)
        }
        else {
          setCookies('access_token', res.data.access_token)
          navigate('/explore')
        }
      }
      catch {
        setMessage('something went wrong')
      }
    }
  }

  const google = async (): Promise<string | void> => {
    setMessage('')
    try {
      await googleLogin()
      const userName = localStorage.getItem('name')
      const password = localStorage.getItem('pass')
      const res = await login(userName, password, true)
      console.log(res)
      if(res.status != 200) {
        const res = await signup(userName, password, true)
        console.log(res)
        if(res.status != 200) {
          setMessage('something went wrong')
        }
        else {
          const res = await login(userName, password, true)
          console.log(res)
          if(res.status == 200) {
            setCookies('access_token', res.data.access_token)
            navigate('/explore')
          }
        }
      }
      else {
        setCookies('access_token', res.data.access_token)
        navigate('/explore')
      }
    }
    catch {
      setMessage('something went wrong')
    }
  }

  return (
         <div className="signdiv">
      <h3 className="start">Resume your Podcast Journey</h3>
      <h2 className="create">Sign in to your account</h2>

      <h4 style={{color:'gray',marginTop:'10px'}}>Not a member? <Link to='/Signup'>Create account</Link></h4>

      <div className="signupinput">

      <div className={message == '' ? 'hidden' : "emailpass my p"}>
        <div className="emailContainer center">{message}</div>
      </div>

        <div className="emailpass">
          <div className="emailContainer"><input type="text" placeholder="User Name" className="emailid" ref={uname} defaultValue='' /></div>
          <div className="emailContainer"><input type="password" placeholder="password" className="emailid" ref={password} defaultValue='' /></div>
        </div>
      </div>
      <div>
       <button className="createacc" onClick={() => signin()}>Sign in</button>

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

export default Login