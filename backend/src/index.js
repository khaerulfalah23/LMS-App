import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import globalRoutes from './routes/globalRoutes.js';
import connectDB from './utils/database.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

dotenv.config();

connectDB();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ text: 'Hello World' });
});

app.use('/api', globalRoutes);
app.use('/api', authRoutes);
app.use('/api', paymentRoutes);

app.listen(port, () => {
  console.log(`LMS Backend listening on port ${port}`);
});
