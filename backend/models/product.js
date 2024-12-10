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
    description: { // Field to describe the product
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stock: { // Field to track the quantity of the product in stock
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Default stock value
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
