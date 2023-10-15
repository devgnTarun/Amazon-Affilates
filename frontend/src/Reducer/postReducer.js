import { ALL_POST_FAIL, ALL_POST_REQUEST, ALL_POST_SUCCESS, CLEAR_ERROR , VISITED_POST_REQUEST , VISITED_POST_SUCCESS , VISITED_POST_FAIL} from "../Constants/postConstant";


export const postReducer = (state = {posts : []}, action) => {
    switch (action.type) {
        case ALL_POST_REQUEST:
        case VISITED_POST_REQUEST:
            return {
                loading : true,
                posts : []
            }
        case ALL_POST_SUCCESS:
        case VISITED_POST_SUCCESS:
            return {
                loading : false ,
                posts : action.payload.posts, //Agr kuch hor v aayega then, dekhlavange
            }
        case ALL_POST_FAIL : 
        case VISITED_POST_FAIL : 
            return {
                ...state,
                loading : false,
                error : action.payload,
            }
         case CLEAR_ERROR:
            return {
                  ...state,
                  error : null
            }
    
        default:
            return state;
    }
}