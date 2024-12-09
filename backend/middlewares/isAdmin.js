const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    if (decoded.role !== 'admin') return res.status(403).send('Forbidden');
    next();
  } catch (err) {
    console.error('Authorization error:', err);
    res.status(403).send('Forbidden');
  }
};

module.exports = isAdmin;
