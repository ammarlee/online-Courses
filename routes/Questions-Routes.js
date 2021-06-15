const express = require('express')
const router = express.Router()
const Multer=require('../controlles/multer')
const postController = require('../controlles/post/post')
const Protect = require('./protect/protect')

// testing for exams
var uploadMultiple = Multer.fields([
    { name: 'question', maxCount: 10 },
    { name: 'answera', maxCount: 10 },
    { name: 'answerb', maxCount: 10 },
    { name: 'answerc', maxCount: 10 },
    { name: 'answerd', maxCount: 10 },])
  
  router.post('/create-questions',Protect.protect,Protect.restrectTo('admin'),uploadMultiple,postController.createQuestions)
  router.post('/update-question',Protect.protect,Protect.restrectTo('admin'),uploadMultiple,postController.updateQuestions)
  router.post('/delete-question',Protect.protect,Protect.restrectTo('admin'),postController.deleteQuestion)
  router.get('/get-questions',postController.getAllQuestions)
  router.post('/send-exame-to-correction',postController.correctExame)
  router.post('/create-exam',Protect.protect,Protect.restrectTo('admin','user','guide'),postController.createExam)
  