const express = require('express');
const auth = require('../middleware/auth.js');
const {userSignUp, userLogin, isLogged} = require('../controllers/loginCtrl.js');

const router = express.Router();

router.get('/is-logged',auth,isLogged);
router.post('/login', userLogin);
router.post('/sign-up', userSignUp);

module.exports = router;