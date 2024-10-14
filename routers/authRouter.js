const express = require('express');
const multer = require('multer');
const router = express.Router();

const { register, login } = require('../controllers/authController.js');
const validator = require('../middlewares/validator.js');
const { registerBody, loginBody } = require('../validations/users.js');
const upload = multer()

router.use(upload.none())

router.post('/register', validator(registerBody), register);
router.post('/login',  validator(loginBody), login);

module.exports = router;