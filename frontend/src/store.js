import {combineReducers , createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { userReducer } from './Reducer/userReducer';
import { postReducer } from './Reducer/postReducer';
import { shopReducer } from './Reducer/shopReducer';


const reducer = combineReducers({
    user : userReducer,
    posts : postReducer,
    shop : shopReducer
});



let initialState = {};
let middleware = [thunk]

const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store