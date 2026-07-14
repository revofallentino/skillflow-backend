const Course = require('../models/Course');
const Module = require('../models/Module');

// Publik: daftar semua course
exports.getAll = async (req, res) => {
  try {
    const courses = await Course.findAll({ order: [['id', 'ASC']] });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Publik: detail 1 course + daftar modulnya
exports.getById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [{ model: Module, as: 'moduleList', order: [['order', 'ASC']] }],
    });
    if (!course) return res.status(404).json({ message: 'Course tidak ditemukan' });

    const plain = course.toJSON();
    plain.moduleList = (plain.moduleList || []).sort((a, b) => a.order - b.order);

    res.json(plain);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin only
exports.create = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin only
exports.update = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course tidak ditemukan' });
    await course.update(req.body);
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin only
exports.remove = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course tidak ditemukan' });
    await course.destroy();
    res.json({ message: 'Course dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};