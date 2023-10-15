import {ALL_POST_FAIL, ALL_POST_REQUEST, ALL_POST_SUCCESS, CLEAR_ERROR , VISITED_POST_REQUEST , VISITED_POST_SUCCESS , VISITED_POST_FAIL } from '../Constants/postConstant'
import axios from 'axios'

export const getAllPost = () => async (dispatch) =>{
    try {
        dispatch({type : ALL_POST_REQUEST})

        const {data} = await axios.get('/api/a1/getAllPosts')

        dispatch({
            type : ALL_POST_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : ALL_POST_FAIL,
            error :error.response.data.message
        })
    }
}

//MOST VISITED POSTS
export const visitedPosts = () => async (dispatch) =>{
    try {
        dispatch({type : VISITED_POST_REQUEST})

        const {data} = await axios.get('/api/a1/mostVisited')

        dispatch({
            type : VISITED_POST_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : VISITED_POST_FAIL,
            error :error.response.data.message
        })
    }
}



//Clear errors
export const clearError = () => async (dispatch)=>{
    dispatch({type : CLEAR_ERROR})
}