var jwt = require('jsonwebtoken')
const {promisify} =require('util')
const User = require("../../models/students")

// FUNCTION FOR PROTECT ROUTES WITH JWT
exports.protect = async (req,res,next)=>{
  console.log('protect');
  console.log(req.headers.authorization);
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1]
  }
  if(!token){
    return res.status(401).json({error:'you are not authanticated'})
  }
  try {
    
  
  const decoded = await promisify(jwt.verify)(token,'shhhhh')
  console.log(decoded);
  // find if user still exist or not 
  const freshUser = await User.findOne({_id:decoded.id})
  if (!freshUser) {
    return res.status(401).json({
      error:'user not exist yet'
    })
    
  }
  // req.userId=decoded.userId
  console.log('/////////');
  // console.log(freshUser);
  req.userId=freshUser._id
  req.user = freshUser
  next()
} catch (error) {
  return res.status(401).json({
    error,
    msg:'user not exist yet'
  })
}

}
exports.restrectTo = (...roles)=>{
  console.log('restrict');
  return (req,res,next)=>{
    console.log('restrict');
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      
     return res.status(400).json({msg:'you are not admin'})
      
    }
    next()
  }
}