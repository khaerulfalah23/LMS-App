import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import globalRoutes from './routes/globalRoutes.js';
import connectDB from './utils/database.js';

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

app.listen(port, () => {
  console.log(`LMS Backend listening on port ${port}`);
});
