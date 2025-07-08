require('dotenv').config();
const express = require('express');
const app = express();
const checkoutRoutes = require('./routes/checkout');

app.use(express.json());
app.use(checkoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
