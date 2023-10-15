import axios from 'axios'
import { SHOP_CREATE_REQUEST, SHOP_CREATE_SUCCESS, SHOP_CREATE_FAIL, CLEAR_ERROR , LOAD_SHOP_REQUEST, LOAD_SHOP_FAIL ,LOAD_SHOP_SUCCESS } from '../Constants/shopConstant'

export const createShop = (shopData) => async (dispatch) =>{
    try {
        dispatch({type : SHOP_CREATE_REQUEST})

        const token =  localStorage.getItem('auth_token')
        const config = {headers :{"Content-Type" : 'multipart/form-data' ,   auth_token: token }  }

        const {data : {order}} = await axios.post('http://localhost:5000/api/a1/checkout' )

     
         //Razor pay options
        const options = {
                        key: "rzp_test_4MUlXLy6MxzKsb", // Enter the Key ID generated from the Dashboard
                        amount: 60000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        currency: "INR",
                        name: "Affilate Villa",
                        description: "Membership trasaction",
                        image: "https://example.com/your_logo",
                        order_id: order.id, 
                        handler : async (response) =>{
                                            try {
                                                const {data} = await axios.post("http://localhost:5000/api/a1/payementverification" ,response )
                                                if (data.success === true) {
                                                    const {data : shopCreated } = await axios.post('http://localhost:5000/api/a1/createshop' , shopData , config )
                                                    dispatch({
                                                        type : SHOP_CREATE_SUCCESS,
                                                        payload : shopCreated
                                                    })
                                                  }
                                             
                                            } catch (error) {
                                                dispatch({
                                                    type : SHOP_CREATE_FAIL,
                                                    error : error.response.data.message
                                                })
                                            }
                                        },
                        prefill: {
                            name: "Gaurav Kumar",
                            email: "gaurav.kumar@example.com",
                            contact: "9000090000"
                        },
                        notes: {
                            address: "Razorpay Corporate Office"
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };
            
                    let razor = new window.Razorpay(options);
                    await razor.open(); 

                 
                 
    } catch (error) {
        dispatch({
            type : SHOP_CREATE_FAIL,
            error : error.response.data.message
        })
    }
}

export const getMyShop = () => async (dispatch) =>{
    try {
        dispatch({type : LOAD_SHOP_REQUEST})

        const token = await localStorage.getItem('auth_token')
        if (!token) {
          return dispatch({ type : LOAD_SHOP_FAIL})
        }
    
        const {data} = await axios.get('/api/a1/myshop' ,  { headers: { auth_token: token } })
        dispatch({type : LOAD_SHOP_SUCCESS , payload : data})
    } catch (error) {
        dispatch({
            type : LOAD_SHOP_FAIL,
            error : error.response.data.message
        })
    }
}

//Clear errors
export const clearError = () => async (dispatch)=>{
    dispatch({type : CLEAR_ERROR})
}



