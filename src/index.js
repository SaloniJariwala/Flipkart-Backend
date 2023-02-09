const express = require('express');
const env = require('dotenv').config();
const connectDB = require('../config/dbConnection');
const path = require('path');
const cors = require('cors');

// Routes
const adminRoutes = require('./routes/admin/index');
const userRoutes = require('./routes/user/index');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

const app = express();

// Database Connection
connectDB();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admin', adminRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.use('/', (req, res) => {
    res.status(200).send("Hello From Server");
});


app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});