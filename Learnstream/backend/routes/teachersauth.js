const express = require('express')
const app = express()
const router =express.Router();
const {loginTeacher,signupTeacher}= require('../controllers/userteacherController')

router.post('/signup',signupTeacher)
router.post('/login',loginTeacher)

module.exports  = router