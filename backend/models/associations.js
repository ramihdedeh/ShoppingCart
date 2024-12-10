const User = require('./User');
const Product = require('./product');
const Cart = require('./cart');

// Define associations
User.belongsToMany(Product, { through: Cart, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Cart, foreignKey: 'productId' });

// Direct associations for Cart
Cart.belongsTo(Product, { foreignKey: 'productId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Product, Cart };

