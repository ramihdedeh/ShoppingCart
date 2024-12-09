const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cart: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  role: { // Add the role column
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user', // Default role is "user"
  },
});

module.exports = User;
