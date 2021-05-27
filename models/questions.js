const mongoose = require("mongoose")

const Schema = mongoose.Schema
const QuestionsSchema = new Schema({
    question:String,
    image:String,
    answers:[{ a:String,correct:Boolean,img:String}] ,
    groupAnswer:{type:String ,default:''},
    rightAnswer:{type:String ,default:''},
    chapter:String,
    updatedTime:Date,
    time:Date,
    lesson:String,
    fullMarks:Number,
    usersDidExams:[
        { 
            srudentId:
             { type:Schema.Types.ObjectId,
                ref:'User',
                required:true 
              },
            results:Number

        }
    ]
   
})
module.exports = mongoose.model('Questions', QuestionsSchema);
