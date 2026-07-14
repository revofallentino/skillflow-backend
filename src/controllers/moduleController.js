const Module = require('../models/Module');

// Publik: daftar modul milik 1 course
exports.getByCourse = async (req, res) => {
  try {
    const modules = await Module.findAll({
      where: { courseId: req.params.courseId },
      order: [['order', 'ASC']],
    });
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Publik: detail 1 modul (untuk halaman materi)
exports.getById = async (req, res) => {
  try {
    const mod = await Module.findByPk(req.params.id);
    if (!mod) return res.status(404).json({ message: 'Modul tidak ditemukan' });
    res.json(mod);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin only
exports.create = async (req, res) => {
  try {
    const mod = await Module.create({
      ...req.body,
      courseId: req.params.courseId,
    });
    res.status(201).json(mod);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin only
exports.update = async (req, res) => {
  try {
    const mod = await Module.findByPk(req.params.id);
    if (!mod) return res.status(404).json({ message: 'Modul tidak ditemukan' });
    await mod.update(req.body);
    res.json(mod);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin only
exports.remove = async (req, res) => {
  try {
    const mod = await Module.findByPk(req.params.id);
    if (!mod) return res.status(404).json({ message: 'Modul tidak ditemukan' });
    await mod.destroy();
    res.json({ message: 'Modul dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};