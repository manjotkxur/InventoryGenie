const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/movements', require('./routes/stockMovementRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/report', require('./routes/reportRoutes'));
app.use('/api/categories',require('./routes/categoryRoutes'));


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
