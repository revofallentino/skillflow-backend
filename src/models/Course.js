const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Umum',
  },
  thumbnail: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  level: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    defaultValue: 'Beginner',
  },
  instructor: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  students: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  duration: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  // Disimpan sebagai JSON string, contoh: ["Photoshop","Illustrator"]
  topics: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, {
  tableName: 'courses',
  timestamps: true,
});

module.exports = Course;