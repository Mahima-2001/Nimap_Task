const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const categoryRoutes = require('./src/routes/categoryroutes')
const productRoutes = require('./src/routes/productroutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
