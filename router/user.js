const express = require('express');
const router = express.Router();
const user = require('../controller/userController');
const auth = require('../middleware/auth')

router.post('/reg', user.Register);
router.post('/login',user.Login)
router.get('/getData', auth.check_token, user.getData)

module.exports = router