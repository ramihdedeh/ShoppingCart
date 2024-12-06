const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shoppingcart', 'root', '2012001', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;
