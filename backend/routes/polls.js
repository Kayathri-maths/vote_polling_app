const express = require('express');
const router = express.Router();
const controller = require('../controllers/pollController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.createPoll);
router.get('/', auth, controller.getAll);
router.get('/:id', auth, controller.getById);
router.post('/:id/vote', auth, controller.vote);
router.get('/user/me', auth, controller.getUserPolls);

module.exports = router;
