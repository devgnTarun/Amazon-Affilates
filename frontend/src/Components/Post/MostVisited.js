import React, { useEffect, useState } from 'react'
import PostCards from './PostCards'
import Slider from "react-slick";
import './post.css'
import {useDispatch, useSelector} from 'react-redux'
import { visitedPosts } from '../../Action/postAction';





const MostVisited = () => {
    const dispatch = useDispatch()
    const {error , loading , posts} = useSelector(state => state.posts)
    var settings = {
      dots: true,
      infinite: true,
      slidesToScroll: 1,
      slidesToShow : 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };


  useEffect(() => {
    
    dispatch(visitedPosts())
    console.log(posts.createdBy)
    
  }, [dispatch])
  

  
  return (
    <div className='most_visited'>
      <h2 className='reusable_heading'>All time Trending!!</h2>
    <Slider {...settings}>
    { posts.map( (i) => {
            return <PostCards id={i._id} clicks={i.clicks} title={i.title} description={i.description} price={i.price} createdBy={i.createdBy.name} createdAt={i.createdAt}/>
           }

           )}
    </Slider>
  

   </div>
  )
}

export default MostVisited