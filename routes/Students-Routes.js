const express = require('express')
const router = express.Router()
const postController = require('../controlles/Students/Students-Controlles')
const Protect = require('./protect/protect')


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
