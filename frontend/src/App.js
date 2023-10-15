import './App.css';
import Register from './Components/User/Register.js';
import 'react-toastify/dist/ReactToastify.css'
import {  ToastContainer } from "react-toastify";
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Header from './Components/Header/Header';
import Home from './Components/Home'
import Login from './Components/User/Login';
import EmailVerify from './Components/User/EmailVerify';
import NotFound from './Components/Utils/NotFound';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Action/userAction';
import AllPost from './Components/Post/AllPost'
import MostVisited from './Components/Post/MostVisited'
import UserProfile from './Components/User/Profiles/UserProfile';
import Member from './Components/Member/Member';
import Seller from './Components/Member/Seller.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getMyShop } from './Action/shopAction';
import Dashboard from './Components/Shop/Dashboard';


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(loadUser())
      dispatch(getMyShop())
      
    } catch (error) {
      
    }
  }, [dispatch])
  
  return (
    <>
    <Router>
    <ToastContainer/>
    <Header/>
    <Switch>
    <Route exact path='/'> <Home/> <MostVisited/> </Route>
    <Route exact path='/register'><Register/></Route>
    <Route exact path='/login'><Login/> </Route>
    <Route exact path='/member'><Member/> </Route>
    <Route exact path='/seller'><Seller/> </Route>
    <Route exact path='/products'><AllPost/></Route>
    <Route exact path='/users/:id/verify/:token'><EmailVerify/></Route>
    <Route exact path='/profile/:id'><UserProfile/></Route>

    {/* Shop dashboard */}
    <Route exact path='/shop/dashboard'><Dashboard/></Route>

   </Switch>
   </Router>
    </>
  );
}

export default App;
