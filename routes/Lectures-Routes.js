const express = require('express')
const router = express.Router()
const Multer=require('../controlles/multer')
const postController = require('../controlles/Lectures/Lectures-Controlles')
const Protect = require('./protect/protect')


router.get('/dashboardData',Protect.protect,Protect.restrectTo('admin','guide'),postController.getDashboardData)


router.post('/create-lecture',Protect.protect,Protect.restrectTo('admin'),Multer.array('files', 10),postController.createLecture)

router.post('/update-lectures',Protect.protect,Protect.restrectTo('admin'),postController.updateLectures)

router.post('/pay-lecture',postController.payLecture)

router.get('/get-all-lectures',postController.getAllLectures)

router.post('/get-single-lecture',Protect.protect,Protect.restrectTo('admin','user','guide'),postController.getSingleLecture)

router.post('/get-single-lecture-details',Protect.protect,Protect.restrectTo('admin','user','guide'),postController.getleLectureDetails)

router.post('/get-remaining-time',Protect.protect,Protect.restrectTo('admin','user'),postController.getRemainingTime)

router.post('/add-extra-time',Protect.protect,Protect.restrectTo('admin'),postController.addExtraTime)

router.post('/delete-lecture',Protect.protect,Protect.restrectTo('admin'),postController.deleteLecture)

router.post('/edit-lecture',Protect.protect,Protect.restrectTo('admin'),Multer.array('vedio', 10),postController.editLecture)

module.exports = router