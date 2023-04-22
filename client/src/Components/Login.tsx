
import {Link} from "react-router-dom"

export const Login = () => {

    return (
               <div className="signdiv">
            <h3 className="start">Resume your Podcast Journey</h3>
            <h2 className="create">Signin in to your account</h2>

            <h4 style={{color:'gray',marginTop:'10px'}}>Not a member? <a to="/Signup">Create account</a></h4>

            <div className="signupinput">

                <div className="emailpass">
                    <div className="emailContainer"><input type="email" placeholder="Email" className="emailid"/></div>
                    <div className="emailContainer"><input type="password" placeholder="password" className="emailid"/></div>
                </div>
            </div>
            <div>
           <button className="createacc">Sign in</button>

           <h3 style={{marginLeft:'135px',marginTop:'20px'}}>Other Credentials</h3>
           </div>

           <div className="othercred">
            <div className="circle"><img src="./public/google.png" height={'30px'} width={'30px'} alt="" /></div>
            <div className="circle"><img src="./public/apple.png" height={'28px'} width={'28px'} alt="" /></div>
            <div className="circle"><img src="" alt="" /></div>
           </div>
        </div>
    )
}