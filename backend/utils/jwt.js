const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '3h',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
