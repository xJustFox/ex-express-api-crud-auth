const express = require('express');
const multer = require('multer')
const router = express.Router();

const { register, login } = require('../controllers/authController.js');
const validator = require('../middlewares/validator.js');
const { registerBody, loginBody } = require('../validations/users.js');
const upload = multer()

router.post('/register', [upload.none(), validator(registerBody)], register);
router.post('/login', [upload.none(), validator(loginBody)], login);

module.exports = router;