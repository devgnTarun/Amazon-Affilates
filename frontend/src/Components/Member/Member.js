import React from 'react'
import './main.css'
import {Link} from 'react-router-dom'
import  { useEffect} from 'react'
import { useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Member = () => {
    
    const {isShop } = useSelector(state => state.shop)

    const history = useHistory()

    useEffect(() => {
   
    if(isShop) {
      history.push('/shop/dashboard')
    }
   }, [ history, isShop])
    
  return (
    <div className="memeber_page">
        <div className="bg_img log_img">

        </div>
        <div className="member_content">
            <h2>Join our affilate Community</h2>
            <p>Get our membership to promote your affilate products here. We just charge life time fees of &#8377; 60 (Currently). This site is mainly to promote amazon links and get verified through it.</p>
            <Link className='edit_profile'  to='/seller'>Join Program</Link>
            <div className="member_profit">
                <div>
                <i class="fa-solid fa-users"></i>
                    <p>Get ready made audience</p>
                </div>
                <div>
                <i class="fa-solid fa-wallet"></i>
                    <p>Lowest fees</p>
                </div>
                <div>
                <i class="fa-solid fa-handshake"></i>
                    <p>Get amazon verified</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Member