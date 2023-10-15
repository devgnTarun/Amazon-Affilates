const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
    unique : [true , 'This shop name is already taken']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: [true ,'You are not allowed to create more shops']
  },
  shopAvatar : {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      required: true,
      type: String,
  },
},
  description: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
