import React, { useEffect } from 'react'
import PostCards from './PostCards'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../../Action/postAction'
import Loader from '../Utils/Loader'

const AllPost = () => {

    const dispatch = useDispatch()
    const {posts, error  ,loading} = useSelector(state => state.posts)

    useEffect(() => {
    dispatch(getAllPost())
    }, [dispatch])
    
  return (
  <>
    {
      loading ? <Loader/> :   <>
      <div className='all_post_window' >
      <h2>Products</h2>
      <div className='all_product'>
         { posts.map( (i) => {
          return <PostCards id={i._id}  title={i.title} description={i.description} price={i.price} createdBy={i.createdBy.name} createdAt={i.createdAt} clicks={i.clicks}/>
         }

         )}
         </div>
      </div>
  </>
    }
   </>
  ) 
}

export default AllPost