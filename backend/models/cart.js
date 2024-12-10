const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Cart = sequelize.define(
  'Cart',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable createdAt and updatedAt
    tableName: 'Cart', // Explicit table name
  }
);

module.exports = Cart;
