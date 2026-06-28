const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalModules: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'enrollments',
  timestamps: true,
});

module.exports = Enrollment;