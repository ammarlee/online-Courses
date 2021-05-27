const mongoose = require("mongoose")

const Schema = mongoose.Schema
const SerialsSchema = new Schema({
 serialNumber:String,
 CardId:String,
 valid:{type:Boolean,default:true},
 lectureDetails:[{
     date:String,
     studentId:{ type:Schema.Types.ObjectId, ref:'Students'},
     lectureId:{ type:Schema.Types.ObjectId, ref:'Lectures'}
 }]
 
})
module.exports = mongoose.model('Serials',SerialsSchema);
