const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const auth = require('../middleware/auth');

router.get('/', auth, enrollmentController.getMyEnrollments);
router.post('/', auth, enrollmentController.enroll);
router.put('/:courseId', auth, enrollmentController.updateProgress);

module.exports = router;