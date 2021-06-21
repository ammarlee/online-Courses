const express = require('express')
const router = express.Router()
const postController = require('../controlles/Serails/Serials-Controlles')
const Protect = require('./protect/protect')


router.post('/create-serial',postController.createSerial)
router.post('/serial-details',Protect.protect,Protect.restrectTo('admin','guide'),postController.getSerialDetails)
router.post('/search-details',Protect.protect,Protect.restrectTo('admin','guide'),postController.searchForDetails)

module.exports =router