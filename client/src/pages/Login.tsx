import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Google, Apple } from '../assets'
import { user } from '../contexts/users'

const Login = () => {

    const { login } = user()
    const uname = useRef()
    const password = useRef()
    const [message, setMessage] = useState<string>('')
    const navigate = useNavigate()

    const signin = async (): Promise<string | void> => {
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
                    navigate('/explore')
                }
            }
            catch {
                setMessage('something went wrong')
            }
        }
    }

    return (
               <div className="signdiv">
            <h3 className="start">Resume your Podcast Journey</h3>
            <h2 className="create">Signin in to your account</h2>

            <h4 style={{color:'gray',marginTop:'10px'}}>Not a member? <Link to='/Signup'>Create account</Link></h4>

            <div className="signupinput">

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
            <div className="circle"><img src={Google} height={'30px'} width={'30px'} alt="" /></div>
            <div className="circle"><img src={Apple} height={'28px'} width={'28px'} alt="" /></div>
            <div className="circle"><img src="" alt="" /></div>
           </div>
        </div>
    )
}

export default Login