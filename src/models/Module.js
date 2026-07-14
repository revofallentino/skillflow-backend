const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course');

const Module = sequelize.define('Module', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    defaultValue: '10 menit',
  },
  type: {
    type: DataTypes.ENUM('article', 'video', 'quiz'),
    defaultValue: 'article',
  },
  // Isi materi: teks/markdown untuk 'article', URL untuk 'video'
  content: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  isFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'modules',
  timestamps: true,
});

Course.hasMany(Module, { foreignKey: 'courseId', as: 'moduleList', onDelete: 'CASCADE' });
Module.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Module;