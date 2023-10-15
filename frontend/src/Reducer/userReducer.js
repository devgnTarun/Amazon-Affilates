import { CLEAR_ERROR, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../Constants/userConstant";


export const userReducer = (state={user : {} , token  :''}, action ) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
           return {
            loading : true,
            isAuthenticated : false
           }
           case LOGIN_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload.user 
            }
            case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                user: action.payload.user
            }
        case LOGOUT_SUCCESS : 
            return {
                user : null,
                isAuthenticated : false,
                loading : false,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading : false,
                user : null,
                isAuthenticated : false,
                error : action.payload
            }
         case LOGOUT_FAIL : 
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_ERROR: 
        return {
            error : null,
            ...state
        }
        default:
            return state;
    }
}