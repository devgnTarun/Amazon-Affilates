const instance = require('../server')
const crypto = require('crypto')

exports.checkout = async (req, res) => {
    try {
        const options = {
            amount: 6000,  // amount in the smallest currency unit
            currency: "INR"
          };
        const order = await instance.instance.orders.create(options) // Imported 2 times because it import instance full module inside instance name object
        res.status(200).json({message : 'Payement order completed' , order})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
exports.payementVerification =  async (req, res) => {
    try {
        const { razorpay_order_id , razorpay_payment_id, razorpay_signature} = req.body

        const body =  razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto.createHmac("sha256" , process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex")

        if(razorpay_signature === expectedSignature) {
             return    res.status(200).json({success : true})
        }
        else {
          return  res.status(400).json({success : false })
        }

        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    console.log(req.body)
    res.status(200).json({success : true})
   
}