

// Admin not working 
exports.authorizedRoles =  (...roles) =>{
    return  (req, res, next) => {
      
    if(!roles.includes(req.user.role)) {
      return  res.status(403).json({message : `You are not authorized to use this took ${req.user.role}`})
    };
    next();
  }
}