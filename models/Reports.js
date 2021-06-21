const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ReportsSchema = new Schema({
 chapter:String,
 lesson:String,
 text:String,
 free:Boolean,
 date:String,
 vedio:String,
 img:String,
 contnent:{
     img:String,
     text:String,
     vedio:String
 },
 duration:Number,
 StudentAttendance:[
     {
         studentId:{ type:Schema.Types.ObjectId, ref:'Students'},
         endTime:String,
         serialId:{ type:Schema.Types.ObjectId, ref:'Serials'},
         date:String,
    }
 ],
 

})
module.exports = mongoose.model('Reports',ReportsSchema);
