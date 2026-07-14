const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Publik
router.get('/', courseController.getAll);
router.get('/:id', courseController.getById);
router.get('/:courseId/modules', moduleController.getByCourse);

// Admin only
router.post('/', auth, isAdmin, courseController.create);
router.put('/:id', auth, isAdmin, courseController.update);
router.delete('/:id', auth, isAdmin, courseController.remove);
router.post('/:courseId/modules', auth, isAdmin, moduleController.create);

module.exports = router;