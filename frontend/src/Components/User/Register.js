import React, { useState , useEffect } from 'react';
// import { Link , useHistory} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux'
import './user.css'
import registerImage from '../../Images/robot-assistant.png'
import userPng from '../../Images/user.jpg'
import {registerUser , clearError} from '../../Action/userAction'
import {  toast } from "react-toastify";
import Loader from '../Utils/Loader';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Register() {

  const history = useHistory()
  // User Define with email and password
  const [user, setUser] = useState({
    name : '',
    email : '' ,
    password : '',
  })

  const dispatch= useDispatch()
  const { isAuthenticated , error , loading} = useSelector((state) => state.user)
  // Getting data from user
  const {name , email , password} = user;
  // Avatar
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setavatarPreview] = useState('')
 
  // Function for Form connection with backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const myForm = new FormData();
    myForm.set('name' ,  name)
    myForm.set('email' ,  email)
    myForm.set('password' ,  password)
    myForm.set('avatar' ,  avatar)

    dispatch(registerUser(myForm))
    toast.success('Email Sended on your registered email, verify to continue ')
    history.push('/login')
  }

  useEffect(() => {
    if(error) {
      toast.error(error)
      dispatch(clearError)
    }
    if(localStorage.getItem('auth_token')) {
      history.push('/')
    }  
  }, [error , isAuthenticated , dispatch , history ])
  

  // Avtar changing and onChange mixed
  const registerChange = (e) => {
      if(e.target.name === 'avatar') {
          const reader = new FileReader();

          reader.onload =() => {
            if(reader.readyState === 2) {
              setavatarPreview(reader.result)
              setAvatar(reader.result)
            }
          }
          reader.readAsDataURL(e.target.files[0])
      }

      else {
        setUser({...user , [e.target.name] : e.target.value} )
      }
  }

  
 
  

  return (
   <>
     {
      loading ? <Loader/> : <>
    
      <div className="login_page">
      <div className="bg_img reg_img"></div>
          <div className="login_container shadow shadow-xl  rounded-lg">
  
          
          <div className="login_box">
          <h1 >Register User   </h1>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="avtarBox"> <img src={avatarPreview || userPng} value={avatarPreview} alt="" /></div>
            <input
              type="text"
              name='name'
              required
              placeholder='Enter Your Name'
              value={name}
              onChange={registerChange}
            />
          
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
  
          <input  required className='image_file' type={'file'} name='avatar' accept='image/' onChange={registerChange}/>
  
          <button className="login_btn" type="submit" value={'Register'} >Register</button>
        </form>
        {/* disabled={loading? true : false} */}
        <Link to={'/login'} className='signbtn'>Already Have account ? Login</Link>
        </div>
        <div className="login_image">
          <img src={registerImage} alt='register'  />
        </div>
        </div>
      </div>
        
     </>
     }
   </>
  );
}

export default Register;