const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken')
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

router.post('/create-serial',postController.createSerial)
router.post('/serial-details',Protect.protect,Protect.restrectTo('admin','guide'),postController.getSerialDetails)
router.post('/search-details',Protect.protect,Protect.restrectTo('admin','guide'),postController.searchForDetails)


router.post('/exame-pdf',postController.printToPdf)
router.get('/get-exams',postController.getRandomQuestion)
router.get('/get-all-exams',postController.getAllExams)
router.get('/get-exam',postController.getExam)


router.post('/notification-seen',Protect.protect,Protect.restrectTo('user','guide'),postController.notificationSeen)

router.post('/create-lecture',Protect.protect,Protect.restrectTo('admin'),Multer.array('files', 10),postController.createLecture)
router.post('/update-lectures',Protect.protect,Protect.restrectTo('admin'),postController.updateLectures)

router.post('/pay-lecture',postController.payLecture)
router.get('/get-all-lectures',postController.getAllLectures)
router.get('/dashboardData',Protect.protect,Protect.restrectTo('admin','guide'),postController.getDashboardData)

router.post('/get-single-lecture',Protect.protect,Protect.restrectTo('admin','user','guide'),postController.getSingleLecture)
router.post('/get-remaining-time',Protect.protect,Protect.restrectTo('admin','user'),postController.getRemainingTime)
router.post('/add-extra-time',Protect.protect,Protect.restrectTo('admin'),postController.addExtraTime)
router.post('/delete-lecture',Protect.protect,Protect.restrectTo('admin'),postController.deleteLecture)
router.post('/edit-lecture',Protect.protect,Protect.restrectTo('admin'),Multer.array('vedio', 10),postController.editLecture)


router.post('/create-student',postController.addNewStudent)
router.post('/active-student',Protect.protect,Protect.restrectTo('admin'),postController.activeStudent)
router.post('/active-all-student',Protect.protect,Protect.restrectTo('admin'),postController.activeAllStudent)
router.post('/delete-all-student',Protect.protect,Protect.restrectTo('admin'),postController.deleteUnactiveStudent)
router.post('/update-profile',Protect.protect,Protect.restrectTo('admin','user','guide'),postController.updateProfile)
router.post('/delete-student',Protect.protect,Protect.restrectTo('admin'),postController.deleteStudent)
router.get('/fetch-students',Protect.protect,Protect.restrectTo('admin'),postController.fetchStudent)
router.get('/absent-student',Protect.protect,Protect.restrectTo('admin','guide'),postController.getAbsentStudent)
router.get('/get-student-data/:id',Protect.protect,Protect.restrectTo('admin','guide','user'),postController.getStudentData)



module.exports = router
