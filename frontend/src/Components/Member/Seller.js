import  { useEffect, useState} from 'react'
import { Step ,StepLabel, Stepper } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import {clearError, createShop } from '../../Action/shopAction'
import axios from 'axios';
import userPng from '../../Images/user.jpg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import Loader from '../Utils/Loader';


const Seller = () => {


    const [activeStep , setActiveStep] = useState(0)
    const dispatch = useDispatch()
    const [shopName, setShopName] = useState('')
    const [description, setDescription] = useState('')
    const [shopAvatar, setShopAvatar] = useState(' ')
    const [avatarPreview, setAvatarPreview] = useState('')
    const [shopError, setShopError] = useState("")
    const {isShop , error , loading} = useSelector(state => state.shop)

    const history = useHistory()

   useEffect(() => {
   
    if(isShop) {
      history.push('/shop/dashboard')
      toast.success('Congratulations!! You have got your e-shop')
    }
    if(error) {
      toast.error(error)
      dispatch(clearError)
    }

   }, [dispatch, history, isShop])
   
    
    // Handle input name validation
    const handleInputNameChange =async (e) => {
      const shopNameInput = e.target.value

        setShopName(shopNameInput);

        if (shopNameInput === '') {
          setShopError('empty');
          return
        }
        try {
          const {data} = await axios.post('/api/a1/validateShopName', { shopName: shopNameInput });
          console.log(data.exists)
          if (data.exists) {
            setShopError('This shop name is already taken.');
          } else {
            setShopError('');
          }
        } catch (error) {
          console.log("error in name")
        }
  

    }

  
const registerChange = (e) => {
        const reader = new FileReader();

        reader.onload =() => {
          if(reader.readyState === 2) {
            setAvatarPreview(reader.result)
            setShopAvatar(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
}

     const steps = [
        {
            label : <p className='order_step_test'>Shop Setup</p>,
            icons : <i class="fas fa-shipping-fast"></i>,
        },
        {
            label : <p className='order_step_test'>Selecting Shop Image</p>, 
            icons : <i class="fas fa-check-circle"></i>,

        },
        {
            label : <p className='order_step_test'>Payement</p>,
            icons : <i class="fas fa-handshake"></i>,
        },
    ]

    const stepStyle = {
        boxSizing : 'border-box',
        marginTop : '150px',
        width :'90%',
    }
    const nextStep = (e) => {
        e.preventDefault();
        const form = e.target.form;
        if (form.checkValidity()) {
          setActiveStep(activeStep + 1);
        } else {
          form.reportValidity();
        }
      }
    const handleSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.set("shopName" , shopName)
        myForm.set("description" , description)
        myForm.set("shopAvatar" , shopAvatar) 
        dispatch(createShop(myForm))
        
    }

   
  return (
  <>
    {
      loading ? <Loader/> :   <>
      <div className='shop_open_page'>
          <div className='shop_open_step'>
           <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
          {steps.map((i, index) => 
              <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index  ? true : false}>
                  <StepLabel icon={i.icons} style={{color : activeStep >= index ? 'rgba(0, 238, 255, 1)' : "rgb(7, 72, 249)"}}>
                          {i.label}
                  </StepLabel> 
              </Step>
          )}
      </Stepper>
      </div>
              
              <div className='shop_open_content'>
  
                  <h2>{activeStep === 0 && 'Setting up shop name' || activeStep === 1 && 'Setting up shop profile image' || activeStep === 2 && 'Payement' }</h2>
  
           {  activeStep === 0 && <form onSubmit={(e) => e.preventDefault()} className="shop_open_form">
                  <label>
                      Shopname Title
                      <input type="text" name="shopName" id="" placeholder='Add your unique shop name (min. 5 characters)' value={shopName} onChange={handleInputNameChange} />
                      <p className='text-red-500'>{shopError}</p>
                  </label>
               <label htmlFor=""> Shopname Description
               <textarea name="description" id="" cols="30" rows="5" placeholder='Edit description for your shop' value={description} onChange={(e) => setDescription(e.target.value)}></textarea></label>    
               <button  disabled={shopName.length < 5 || description.length < 30 } onClick={nextStep} className='step_next_btn mt-2'>Next</button>
              </form>}
  
           {  activeStep === 1 && <form onSubmit={(e) => e.preventDefault()} className="shop_open_form">
            <div className='avatar_preview_seller'>        <img  src={avatarPreview || userPng} alt="" /></div>
   
                  <label>
                      Setup Image
                      <input className='shop_image_input' type={"file"} accept='image/' name="shopAvatar" id=""   onChange={registerChange}/>
                  </label>
                  
               <button onClick={nextStep} className='step_next_btn mt-2'>Next</button>
               <button onClick={() => setActiveStep(activeStep - 1)} className='step_back_btn mt-2'>Go Back</button>
              </form>}
  
           {  activeStep === 2 && <form onSubmit={(e) => e.preventDefault()} className="shop_open_form">
                  <label>
                      Make Payement
                  </label>
                  
               <button className='step_next_btn mt-2'  onClick={handleSubmit} >Make Payement of 	&#8377; 60 </button>
               <button onClick={() => setActiveStep(activeStep - 1)} className='step_back_btn mt-2'>Go Back</button>
              </form>}
  
  
              </div>
  
      </div>
      </>
    }
  </>
  )
}

export default Seller