const Enrollment = require('../models/Enrollment');

exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { userId: req.user.id },
    });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.enroll = async (req, res) => {
  try {
    const { courseId, totalModules } = req.body;

    const existing = await Enrollment.findOne({
      where: { userId: req.user.id, courseId },
    });
    if (existing) {
      return res.status(400).json({ message: 'Sudah terdaftar di kursus ini' });
    }

    const enrollment = await Enrollment.create({
      userId: req.user.id,
      courseId,
      progress: 0,
      totalModules,
    });

    res.status(201).json({ message: 'Berhasil enroll', enrollment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress } = req.body;

    await Enrollment.update(
      { progress },
      { where: { userId: req.user.id, courseId } }
    );

    res.json({ message: 'Progress berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};