import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Slider = () => {

  const location = useLocation()

  const [slider, setSlider] = useState('slider_bar_hide')
  const toggle =() => {
    if(slider === 'slider_bar_hide') {
     setSlider('slider_bar')
    }
    else{
      setSlider('slider_bar_hide')
    } 
  }

  return (
    <div className={`${slider}  shadow-lg bg-gray-900  `}>
      <span onClick={toggle} className='slider_toggle bg-gray-900 text-white'><i className="fa-solid fa-bars"></i></span>
        <div className='mt-10 py-10 '>
    <Link to={'/dashboard'} className={`text-[12px] flex items-center justify-center h-16 px-4 border-l-4 ${location.pathname === '/shop/dashboard' ? "border-white bg-blue-500" : 'border-gray-300 hover:bg-blue-500' } mt-10`}>
      <i className="fas fa-tachometer-alt text-white"></i>
      <span className="ml-4  font-medium text-white">Dashboard</span>
    </Link>
    <Link to="/performance" className={`text-[12px] flex items-center justify-center h-16 px-4 border-l-4 ${location.pathname === '/performance' ? "border-white bg-blue-500" : 'border-gray-300 hover:bg-blue-500' }`}>
      <i className="fas fa-chart-line text-white"></i>
      <span className="ml-4  font-medium text-white">Performance</span>
    </Link>
    <Link to="/students" className={`text-[12px] flex items-center justify-center h-16 px-4 border-l-4 ${location.pathname === '/students' ? "border-white bg-blue-500" : 'border-gray-300 hover:bg-blue-500' } `}>
      <i className="fas fa-user-graduate text-white"></i>
      <span className="ml-4  font-medium text-white">Students</span>
    </Link>
    </div>
</div>
  )
}

export default Slider