const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minLength : [6 , 'Minimum length of title should 6']
    },
    description : {
        type : String,
        required : true,
        minLength : [10 , 'Minimum length of title should 10']
    },
    price : {
        type : Number,
        required : true,
    },
    link : {
        type : String,
        required : true
    },
     images: {
         public_id: {
              type: String,
              required: true,
            },
         url: {
              required: true,
              type: String,
            },
     },
     createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required :true
     },
     clicks: {
        type: Number,
        default: 0
      }
},
{ timestamps: true })

module.exports = mongoose.model('Post' , postSchema)