import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../Action/userAction'
import { toast } from 'react-toastify'

const Header = () => {

    const {user , isAuthenticated} = useSelector(state => state.user)
    const {isShop} = useSelector(state => state.shop)
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef();
    const dispatch = useDispatch()

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        dispatch(logoutUser())
        toast.success('User Log out successfully')
    }
    const [list, setList] = useState('nav_list')

    const toggle = () => {
        if(list === 'nav_list') {
            setList('nav_list nav_close')
        }
        else {
            setList('nav_list')
        }

    }

  return (
    <>
        <div className="navBar shadow-lg ">
            <div className="logo_div">
                <Link to='/'>aSENCE</Link>
            </div>
            <div className={list}>
                <ul>
                    <li><Link to='/'> Home </Link></li>
                    <li><Link to='/products'> Products </Link></li>
                    <li><Link to='/topProduct'> Top Products </Link></li>
                    <li><Link to='/member'> Membership </Link></li>
                    <li><Link to='/contact'> Contact </Link></li>
                </ul>
            </div>
            <div className="right_list">
            { isAuthenticated && isAuthenticated ?  

                (
                    <div className="relative" ref={ref}>
      <button
        onClick={toggleMenu}
        style={{overflow : 'hidden' , borderRadius : '50%'}}
        className="flex items-center justify-center w-12 h-12 rou38+
        9+nded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
            <img src={user.avatar.url} alt={`${user.name} Image`}/>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
        
          <div className="py-1">

           { isShop && isShop ?  <Link
              href="/shop/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            > 
              <i className="mr-2 fas fa-tachometer-alt"></i> Dashboard
            </Link> : ""   }

            <Link
              to={`/profile/${user._id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="mr-2 fas fa-user"></i> Profile 
            </Link>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
            >
              <i className="mr-2 fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      )}
    </div>
                )
            
            : 
                    <Link to='/login' className='login_btn nav_log '>  <i className='fas fa-user'></i> Login</Link>}
                <i onClick={toggle} className='bars_icons fas fa-bars '></i>
            </div>
        </div>
    </>
  )
}

export default Header