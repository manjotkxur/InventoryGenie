const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn(' No token provided');
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error('Token expired — returning 401 to trigger refresh');
      return res.status(401).json({ message: 'Token expired' }); 
    }

    console.error(' Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
