const express = require('express');
const { userSignUp, userLogin } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);

module.exports = router;