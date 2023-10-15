import React, { useEffect , useState} from 'react'
import imgI from '../../Images/user.jpg'
import axios from 'axios'
import {  Dialog, DialogTitle, DialogContent, DialogActions , createTheme , ThemeProvider } from '@mui/material';
import {toast} from 'react-toastify'

const PostCards = ({id , title , description , price , createdBy , createdAt , clicks}) => {
   
    const options = {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      };
      const date = new Date(createdAt);
      const formatDate = new Intl.DateTimeFormat('en-IN', options).format(date);

      
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      
      const handleClick = () => {
        try {
            axios.get(`/api/a1/click/${id}`).then((response)=> {
                toast.success(response.data.message)
            })

        } catch (error) {
            toast.error(error.message)
        }
      }
      const [openDialog, setOpenDialog] = useState(false);

      const openProductDialog = () => {
        setOpenDialog(true);
      };
    
      const closeProductDialog = () => {
        setOpenDialog(false);
      };
      


  return (
  
    <>
       <div  key={id} className="post_card">
            <div className="img_post"><img className='img_post_inside' src={imgI} alt="post" /></div>
            <div className="post_detail">
                <h3>{title}</h3>
            </div>
            <div className="date_shop">
                <span><i class="fa-solid fa-users-viewfinder"></i> {clicks}  Visits</span>
                <span><i class="fa-sharp fa-solid fa-circle-dollar">	&#8377;</i>{price}</span>
            </div>
                <div className="date_card"><i class="fa-solid fa-clock"></i>{formatDate} </div>
            <button onClick={openProductDialog} className=' btn_card bg-sky-500 text-white rounded-lg hover:bg-sky-400 py-2 '>Know More</button>
        </div>  


        {/* /product details    */}
        <ThemeProvider  key={id} theme={darkTheme}>        <Dialog open={openDialog} onClose={closeProductDialog}>
        <DialogTitle> 
            <p className='dialog_title'>{title}</p> <button onClick={closeProductDialog} className='dialog_close'><i class="fa-solid fa-xmark"></i></button>
          </DialogTitle>
        <DialogContent>
          <div className="dialog_content">
            <div className="dialog_img">
              <img src={imgI} alt="" />
            </div>
            <div className="dialog_info">
            <p className='dialog_desc'> Description: <br/>  <br/>    {description}</p>
            <div className="date_shop">
          <span><i class="fa-solid fa-users-viewfinder"></i> {clicks}  Visits</span>
          <span><i class="fa-sharp fa-solid fa-circle-dollar">	&#8377; </i>{price}</span>
            </div>
          <div className="date_card"><i class="fa-solid fa-clock"></i>{formatDate} </div>
        <button onClick={handleClick} className='  btn_card bg-sky-500 text-white rounded-lg hover:bg-sky-400 py-2 link_btn '> LINK</button>
            </div>
          </div>
         
        </DialogContent>
        <DialogActions>
          <p>Uploaded By : {createdBy}</p>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </>
  )
}

export default PostCards