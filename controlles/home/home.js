const algoliasearch = require("algoliasearch");
const client = algoliasearch("SRG9R6FP41", "a10e35ddd54011feeb240cf013c0f9b0");
const index = client.initIndex("amazontest");
const {cloudinary} = require('../cloudinary')


  exports.searching=(req,res,next)=>{
    index.search(req.body.name).then((result)=>{
       return res.status(200).json( result.hits)
     })
     .catch((error)=>{
       return  res.status(401).json(error)
     })
  
 }
 exports.homePage=async(req,res,next)=>{
   try {
     
   } catch (error) {
     res.status(400).json({success:false,error})
     
   }

}

 
