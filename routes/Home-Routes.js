const express = require('express')
const router = express.Router()
const Protect = require('./protect/protect')
const homeControlles = require('../controlles/home/Home-Controlles')


router.post('/notification-seen',Protect.protect,Protect.restrectTo('user','guide'),homeControlles.notificationSeen)

router.get('/searching',homeControlles.searching)
router.get('/',homeControlles.homePage)


module.exports = router
