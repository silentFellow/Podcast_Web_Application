import { FC, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useCookies } from 'react-cookie'
import { user } from '../contexts'

const Login: FC = () => {

  const { login, googleLogin, signup } = user()

  const uname = useRef('')
  const password = useRef('')

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  
  const [_, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const signIn = async () => {
    setMessage('')
    if(uname.current.value == '' || password.current.value == '') {
      return setMessage('Enter details')
    }
    else {
      setLoading(true)
      try {
        setMessage('Please Wait')
        const res = await login(uname.current.value, password.current.value)
        if(res.status != 200) {
          setMessage(res.data)
        }
        else {
          setCookies('access_token', res.data.access_token)
          navigate('/explore')
        }
      }
      catch(err) {
        setMessage('something went wrong')
        console.log(err)
      }
    }
    setLoading(false)
  }

  const gSignIn = async () => {
    setMessage('')
    setLoading(true)
    try {
      const google = await googleLogin()
      const userName = google.user.displayName
      const password = google.user.email
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
            navigate('/explore')
          }
        }
      }
      else {
        setCookies('access_token', res.data.access_token)
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
    <div className="min-h-screen w-screen flex items-center text-[1.8rem] bg-lprimary dark:bg-dprimary text-lsecondary dark:text-dsecondary">
      
      <div className="h-screen w-screen flex flex-col justify-center items-center p-9 sm:h-[42rem] sm:w-[50rem] sm:ml-[12%] sm:rounded-3xl sm:justify-normal">
        <header className="w-full">
          <span className="font-[600] tracking-wide">Resume Your Journey - </span>
          <span className='font-black text-lascent dark:text-dascent'>Sign In</span>
        </header>

        <div className={`${message != '' && "w-full mt-3 flex items-center"}`}>
          <span className="font-black text-lascent dark:text-dascent">{message.toUpperCase()}</span>
        </div>

        <form className="w-full mt-[2.4rem]">
          <input type="text" placeholder='Enter User Name' className="w-[96%] p-4 px-7 text-[1.5rem] rounded-xl outline-none bg-lbg dark:bg-dbg" ref={uname} />
          <input type="password" placeholder='Enter Password' className="w-[96%] p-4 px-7 text-[1.5rem] rounded-xl my-5 mt-12 outline-none bg-lbg dark:bg-dbg" ref={password} />

          <span className='font-black text-[1.5rem]'>Don't Have An Account ? </span>
          <Link to={'/signup'} className='font-black text-[1.5rem] text-lascent dark:text-dascent'>Sign Up!</Link><br />

          <div className="w-full flex justify-center">
            <button
              type='button'
              className='bg-lascent dark:bg-dascent font-black font-space px-6 py-2 rounded-lg mt-5 hover:opacity-90' 
              disabled={loading} 
              onClick={() => signIn()}
            >Login</button>
          </div>
        </form>

        <footer className="w-full mt-[2.7rem] flex justify-center">
          <button className="bg-lbg dark:bg-dbg w-[66%] p-4 rounded-xl flex justify-center items-center cursor-pointer border-[0.01rem] border-lascent dark:border-dascent hover:opacity-80" 
            disabled={loading} 
            onClick={() => gSignIn()}
          >
            <FcGoogle />
            <span className='font-black text-[1.4rem] mx-6'>Sign In With Google</span>
          </button>
        </footer>
      </div>

    </div>
  )
}

export default Login