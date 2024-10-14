const express = require('express');
const router = express.Router();

const { index, store, show, update, destroy } = require('../controllers/postsController.js');
const validator = require('../middlewares/validator.js');
const { paramSLUG } = require('../validations/generic.js');
const { bodyData } = require('../validations/posts.js');
const authenticateToken = require('../middlewares/auth.js');

router.get('/', index);
router.post('/', [authenticateToken, validator(bodyData)], store);

router.use('/:slug', validator(paramSLUG));

router.get('/:slug', show);
router.put('/:slug', [authenticateToken, validator(bodyData)], update);
router.delete('/:slug', authenticateToken, destroy);

module.exports = router;