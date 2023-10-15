const Post = require('../models/postSchema')


//Create post
exports.createPost = async (req, res , next) => {
    try {
        const {title , description , link , images = {public_id , url} , price} = req.body

        const post = await Post.create({title, description , link , price, images , createdBy : req.user.name})

        res.status(200).json({message : 'Post Created Successfully' , success : true , post})

    } catch (error) {
        res.status(500).json(error.message)
    }
}

//Get all post
exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate('createdBy', 'name');
        res.status(200).json({success : true , posts })
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//Get all post of particular user
exports.getUserPosts = async (req , res) => {
    try {
        const posts = await Post.find({createdBy : req.user})

        res.status(200).json({success : true , posts})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//Link Tracking 
exports.clickCount = async (req, res ) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        post.clicks++;
        await post.save();
        // return res.redirect(post.link);
        return res.status(200).json({message :'click counted'})
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

//Most clicked 
exports.mostClicked = async ( req, res ) => {
    try {
        const posts = await Post.find().sort({ clicks: -1 }).limit(10);
        return res.status(200).json({ success: true, posts });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

