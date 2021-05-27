const mongoose = require("mongoose")
const Schema = mongoose.Schema
const StudentsSchema = new Schema({
 name:String,
 email:String,
 addres:String,
 phone:String,
 fatherNumber:String,
 city:String,
 age:Number,
 birthDay:String,
 gender:String,
 img:{
    type: String,
    default:
      "https://res.cloudinary.com/ammarleejot/image/upload/v1609954985/j7v7ezyvnax9fuokrryb.jpg",
  },
 password:{type:String,select:false},
 restToken:String,
 token:String,
 signupDate:String,
 role:{ type:String,default:'user',enum:['admin','guide','user']},
 active:{type:Boolean,default:true},
 notifications:[
     {
         title:String,
         seen:Boolean,
         date:Date,
         lectureId: {type:Schema.Types.ObjectId, ref:'Lectures'},

     }
 ],
 lectures:[
     {lectureId: {type:Schema.Types.ObjectId, ref:'Lectures'},
      date:String,
      endTime:String,
      serialId:{ type:Schema.Types.ObjectId, ref:'Serials'}

    }
 ],
 exams:[
     {
         date:String,
         exameModel:Array,
         result:String

     }


 ],
 lastThreLectures:[
     {lectureId:
        {type:Schema.Types.ObjectId, ref:'Lectures'},
        date:String,

    }]
})
module.exports = mongoose.model('Students',StudentsSchema);
