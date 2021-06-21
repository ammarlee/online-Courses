const express = require('express')
const router = express.Router()
const postController = require('../controlles/Exams/Exams.Controlles')
const Protect = require('./protect/protect')

router.post('/exame-pdf',postController.printToPdf)
router.get('/get-exams',postController.getRandomQuestion)
router.get('/get-all-exams',postController.getAllExams)
router.get('/get-exam',postController.getExam)
router.post('/send-exame-to-correction',postController.correctExame)
router.post('/create-exam',Protect.protect,Protect.restrectTo('admin','user','guide'),postController.createExam)
module.exports = router