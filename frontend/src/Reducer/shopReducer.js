import { SHOP_CREATE_REQUEST, SHOP_CREATE_SUCCESS, SHOP_CREATE_FAIL , LOAD_SHOP_REQUEST, LOAD_SHOP_FAIL ,LOAD_SHOP_SUCCESS , CLEAR_ERROR} from "../Constants/shopConstant"



export const shopReducer = (state = {shop : {}}, action) => {
    switch (action.type) {
        case SHOP_CREATE_REQUEST:
        case LOAD_SHOP_REQUEST:
            return {
                loading : true,
                isShop : false
            }
        case SHOP_CREATE_SUCCESS:
        case LOAD_SHOP_SUCCESS:
            return {
                loading : false ,
                shop : action.payload,
                isShop : true
            }
        case SHOP_CREATE_FAIL : 
        case LOAD_SHOP_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload,
                isShop : false
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