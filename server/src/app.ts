import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import productRoutes from './routes/products';
import cors from 'cors';

dotenv.config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions)); 

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api', productRoutes);

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('Error connecting to MongoDB:', err);
  });
