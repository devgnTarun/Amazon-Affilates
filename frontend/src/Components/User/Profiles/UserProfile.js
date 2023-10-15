import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './main.css'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import Loader from "../../Utils/Loader.js"

const UserProfile = () => {

    const history = useHistory()
    const {user , isAuthenticated ,  loading}  = useSelector(state => state.user)
    const {isShop , shop , loading: shopLoading} = useSelector(state => state.shop)

    const options = {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    };
    const date = new Date(user.createdAt);
    // const formatDate = new Intl.DateTimeFormat('en-IN', options).format(date);

    useEffect(() => {

    if(!isAuthenticated) {
        history.push('/')
    }

    }, [isAuthenticated])
    
  return (
   <>
   {loading && shopLoading ? <Loader/> :  <>
        <div className="profile_page">
        <div className="bg_img log_img"></div>

            <div className="profile_box">
              <div className="profile_left">
                <div className="image_profile_page">
                  <img src={user.avatar.url} alt={`${user.name}'s profile`} />
                </div>
                <h2>{user.name}</h2> 
                <p>Active as : <span className={`${isShop && isShop ?  "text-green-500" : "text-red-500"}`}> {isShop && isShop ?  "Seller" : "User"}</span> {isShop && isShop ? "" :  <Link to='/account_closure'>(Convert into Seller)</Link>} </p> 
                <button className="edit_profile">
                   Edit
                </button>
                <button className=" edit_profile closure_btn">
                  Request for closure
                </button>
              </div>

              <div className="profile_right">
                <p>Active E-mail : <span> {user.email}</span></p>
                <p>Joined At : <span> {user.createdAt}</span> </p>
                <p>Posts uploaded : {isShop && isShop ? <><span> {shop.products || 0}</span></>  : <Link to="/seller">Become seller to Post</Link>} </p>
              

                {isShop && !isShop ? 
                <> <h2>Recent produts</h2>
                <div className="products_profile_div">
                    dhhdhdhhd
                </div></> :
                
                 <Link to="/member" className="no_products_profile">
<i className="fas fa-lock"> </i>
<h5>Upgrade to post</h5>
                </Link>
                }


                

              </div>
            </div>
        </div>
    </>}
   </>
  )
}

export default UserProfile