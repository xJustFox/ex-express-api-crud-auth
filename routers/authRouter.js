const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController.js');
const validator = require('../middlewares/validator.js');

router.post('/register', register);
router.post('login', login);

module.exports = router;