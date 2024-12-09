const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define(
  'Product',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: { // New category column
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
  },
  {
    timestamps: false, // Disable createdAt and updatedAt
  }
);

module.exports = Product;
