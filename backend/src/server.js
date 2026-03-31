import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const APP_NAME = process.env.APP_NAME || 'Personal Contact Manager';

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.json({
    app: APP_NAME,
    message: 'Backend is running',
  });
});

app.use('/api/contacts', contactRoutes);

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`${APP_NAME} server is running on port ${PORT}`);
  });
});
