require('dotenv').config();
const express = require('express');
const app = express();
const checkoutRoutes = require('./routes/checkout');

app.use(express.json());
app.use(checkoutRoutes);

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' })); // or your frontend URL
