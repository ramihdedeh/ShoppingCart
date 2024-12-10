const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sequelize = require('./models/index');

const { User, Product, Cart } = require('./models/associations');

const { Sequelize } = require('sequelize');
const isAdmin = require('./middlewares/isAdmin');

User.sync();
Product.sync();
Cart.sync();
    
const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors());

// Sync Sequelize Models
sequelize.sync({ force: false })
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err));



// Register User
app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if username already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) return res.status(400).send('Username already taken');
  
      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      res.status(201).send('User registered successfully');
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).send('Error registering user');
    }
  });
// Login User
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).send('User not found');

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid credentials');

    // Generate a token with role information included
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    // Respond with token and role
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Error logging in');
  }
});

// Logout
app.post('/logout', (req, res) => {
  res.status(200).send('Logout successful');
});


// Fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});


//API's for the CART FEATURE
// Get User Cart
app.get('/cart', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ['id', 'title', 'price', 'image'], // Fetch required fields
        },
      ],
    });

    const formattedCart = cartItems.map((item) => ({
      id: item.Product.id,
      title: item.Product.title,
      price: item.Product.price,
      image: item.Product.image,
      quantity: item.quantity,
    }));

    res.status(200).json(formattedCart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).send('Server error. Please try again later.');
  }
});




// Update User Cart
app.post('/cart', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).send('Product ID and quantity are required');
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    if (quantity > product.stock) {
      return res.status(400).send('Insufficient stock');
    }

    product.stock -= quantity;
    await product.save();

    const [cartItem, created] = await Cart.findOrCreate({
      where: { userId, productId },
      defaults: { quantity },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    res.status(200).send('Product added to cart successfully');
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send('Server error. Please try again later.');
  }
});

app.delete('/cart/:productId', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const productId = req.params.productId;

    const cartItem = await Cart.findOne({ where: { userId, productId } });
    if (!cartItem) {
      return res.status(404).send('Product not found in cart');
    }

    const product = await Product.findByPk(productId);
    product.stock += cartItem.quantity;
    await product.save();

    await cartItem.destroy();

    res.status(200).send('Product removed from cart successfully');
  } catch (err) {
    console.error('Error removing from cart:', err);
    res.status(500).send('Server error. Please try again later.');
  }
});



//API's for the CATEGORY FEATURE
app.get('/products/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
      const products = await Product.findAll({
        where: { category },
      });
      res.status(200).json(products);
    } catch (err) {
      console.error('Error fetching products by category:', err);
      res.status(500).send('Error fetching products');
    }
  });
// API to fetch distinct categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Product.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']],
    });

    // Extract category names and return them
    const categoryList = categories.map((c) => c.category);
    res.status(200).json(categoryList);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Error fetching categories');
  }
});

//API's for the ADMIN Feature

// Protect the route for adding products
app.post('/products', isAdmin, async (req, res) => {
  try {
    const { title, description, price, image, stock, category } = req.body;
    const newProduct = await Product.create({ title, description, price, image, stock, category });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).send('Error adding product');
  }
});

// Protect the route for deleting products
app.delete('/products/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Product.destroy({ where: { id } });
    if (deletedCount === 0) return res.status(404).send('Product not found');
    res.status(200).send('Product deleted successfully');
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).send('Error deleting product');
  }
});

//Update the product
app.put('/products/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image, stock, category } = req.body;

  try {
    // Find and update the product by ID
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).send('Product not found');

    await product.update({ title, description, price, image, stock, category });
    res.status(200).json(product); // Return the updated product
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Error updating product');
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
