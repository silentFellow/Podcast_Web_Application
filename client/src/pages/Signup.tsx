import { FC, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Google, Apple } from '../assets/'
import { user } from '../contexts/users'

const Signup: FC = () => {

  const firstName = useRef()
  const lastName = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const [message, setMessage]= useState<string>('')
  const navigate = useNavigate()

  const { signup } = user()

  const SignUp = async () => {
    if(firstName.current.value == '' || password.current.value == '') {
      return setMessage("Enter a valid details")
    }
    if(password.current.value != confirmPassword.current.value) {
      return setMessage('Passwords do no match')
    }

    const name = firstName.current.value + lastName.current.value || ''
    try {
      const res = await signup(name, password.current.value)
      if(res.status != 200) {
        setMessage(res)
      }
      else {
        navigate('/login')
      }
    }
    catch {
      setMessage('something went wrong')
    }
  }

  return(
  <div className="signdiv">
    <h3 className="start">Start your Podcast Journey</h3>
    <h2 className="create">Create new account</h2>

    <h4 style={{color:'gray',marginTop:'10px'}}>Already a member? <Link to='/login'>login</Link></h4>

    <div className="signupinput">
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
     <button className="createacc" onClick={() => SignUp()}>Create account</button>

     <h3 style={{marginLeft:'135px',marginTop:'20px'}}>Other Credentials</h3>
     </div>

     <div className="othercred">
    <div className="circle"><img src={Google} height={'30px'} width={'30px'} alt="" /></div>
    <div className="circle"><img src={Apple} height={'28px'} width={'28px'} alt="" /></div>
    <div className="circle"><img src="" alt="" /></div>
     </div>
  </div>
  )
}

export default Signup