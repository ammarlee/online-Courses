const algoliasearch = require("algoliasearch");
const client = algoliasearch("SRG9R6FP41", "a10e35ddd54011feeb240cf013c0f9b0");
const index = client.initIndex("amazontest");
const {cloudinary} = require('../cloudinary')
const Student = require("../../models/students");

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
exports.notificationSeen = async (req, res, next) => {
  const userId = req.body.userId;
  const notificationId = req.body.item._id;
  try {
    let user = await Student.updateOne(
      { _id: userId, "notifications._id": notificationId },
      { $set: { "notifications.$.seen": true } },
      { new: true }
    );
    if (user.nModified === 1) {
      res.status(200).json({ user, msg: "updated" });
    } else {
      res.status(201).json({ user, msg: "not updated" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

 
