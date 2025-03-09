require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const connectToMongo = require('./db');
const cors = require("cors");

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData")); 
app.use('/api/payment', require("./Routes/paymentRoutes")); 
app.use('/api/seller', require("./Routes/sellerRoutes")); 

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('SSL Store ID:', process.env.SSL_STORE_ID); 
});
