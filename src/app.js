const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const tarjetasRoutes = require('./routes/Tarjetas');
const transactionRoutes = require('./routes/Transacciones');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/tarjetas', tarjetasRoutes);
app.use('/api/transacciones', transactionRoutes);


app.use(errorHandler);

module.exports = app;
