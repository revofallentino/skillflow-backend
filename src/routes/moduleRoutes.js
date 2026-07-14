const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Publik
router.get('/:id', moduleController.getById);

// Admin only
router.put('/:id', auth, isAdmin, moduleController.update);
router.delete('/:id', auth, isAdmin, moduleController.remove);

module.exports = router;