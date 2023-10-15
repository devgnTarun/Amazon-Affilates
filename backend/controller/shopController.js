const Shop = require("../models/shopSchema");
const cloudinary = require("cloudinary");
const instance = require("../server");
const User = require("../models/userSchema")


// Function to verify the payment on your server-side
const paymentVerificationSuccessful = (paymentData) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;
  
      // Combine the order_id and payment_id for verification as described in the Razorpay documentation
      const body =  razorpay_order_id + "|" + razorpay_payment_id
  
      // Calculate the expected signature using your Razorpay API secret
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');
  
      // Compare the expected signature with the received signature
      return razorpay_signature === expectedSignature;
    } catch (error) {
      return false;
    }
  };


//   Create shop function 
exports.createShop = async (req, res, next) => {
  try {
    const { shopName, description } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.shopAvatar, {
      folder: "Affilate User",
      width: 150,
      crop: "scale",
    });

 

        const shop = await Shop.create({
          shopName,
          description,
          owner : req.user,
          shopAvatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          paymentStatus: true, // Update payment status to true for a successful payment
        })

        await User.findByIdAndUpdate(req.user._id, { role: "seller" , shop : shop._id });
        // req.user.shop = shop._id; 
         res.status(200).json({ message: 'Shop created successfully', shop });
    

  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};


//Shop name validation

exports.shopNameValidate = async (req, res, next) => {
  const { shopName } = req.body;

  try {

    const shop = await Shop.findOne({ shopName: { $regex: new RegExp(`^${shopName}$`, 'i') } });

    if (shop) {
     return res.status(200).json({
        exists: true
      });

    } else {
     return res.status(200).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ message : error.message });
  }
};

//Get my shop

exports.getMyShop = async (req, res, next) => {
  try {
    // const shop = await Shop.find({ owner: req.user });
    const user =  req.user;

    // Use Mongoose's 'populate' method to fetch the shop data for the user
    await user.populate({path : "shop"});

    // Now, the 'user' object will have the 'shop' field populated with the actual shop data
    const shop = user.shop;
    // const shop = await Shop.findById(user.shop);
    if (!shop) {
    return  res.status(404).json({ message: "Shop not founded on your I'd!" }) ;
    }

   return res.status(200).json({ shop });
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};
