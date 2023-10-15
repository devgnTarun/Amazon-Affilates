import React, { useState , useEffect } from 'react';
// import { Link , useHistory} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux'
import './user.css'
import loginImg from '../../Images/robot.png'
import {clearError, loginUser} from '../../Action/userAction'
import {  toast } from "react-toastify";
import Loader from '../Utils/Loader';
import { Link , useHistory } from 'react-router-dom';

function Login() {

  const history = useHistory()
  // User Define with email and password
  const [user, setUser] = useState({
    email : '' ,
    password : '',
  })

  const dispatch= useDispatch()
  const { isAuthenticated , error , loading} = useSelector((state) => state.user)
  // Getting data from user
  const { email , password} = user;
 
  // Function for Form connection with backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(email ,password))
  }

  useEffect(() => {
    if(error) {
      toast.error(error)
      dispatch(clearError)
    }
    if(localStorage.getItem('auth_token')){
      history.push('/')
      toast.success('User Login Successfully! ')
    }
  }, [error , isAuthenticated , dispatch, history ])
  

  // Avtar changing and onChange mixed
  const registerChange = (e) => {
     
        setUser({...user , [e.target.name] : e.target.value} )
      
  }

  
 
  

  return (
   <>
     {
      loading ? <Loader/> : <>
    
      <div className="login_page">
      <div className="bg_img log_img"></div>
          <div className="login_container shadow shadow-xl  rounded-lg">
  
          
          <div className="login_box">
          <h1 >Login    </h1>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
        
            <input
              type="email"
              name='email'
              required
              placeholder='Enter your email'
              value={email}
              onChange={registerChange}
            />
         
            <input
              type="password"
              name='password'
              required
              placeholder='Enter Your Password'
              value={password}
              onChange={registerChange}
            />
  
          <button className="login_btn" type="submit" value={'Login'} >Login</button>
        </form>
        {/* disabled={loading? true : false} */}
        <Link to={'/register'} className='signbtn'>Don't Have account ? Register</Link>
        </div>
        <div className="login_image">
          <img src={loginImg} alt='login'  />
        </div>
        </div>
      </div>
        
     </>
     }
   </>
  );
}

export default Login;