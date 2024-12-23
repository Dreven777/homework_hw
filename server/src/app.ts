import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import productRoutes from './routes/products';
import cors from 'cors';

import Product from './models/product';

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
    // for(let i = 0; i < 100; i++){
    //   console.log('insert')
    //   const product = new Product({ name: generateRandomText(1), description: generateRandomText(10), price: 5000 });
    //   product.save();
    // }
  })
  .catch((err: Error) => {
    console.error('Error connecting to MongoDB:', err);
  });


  function generateRandomText(wordCount = 10) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const words = [];
    
    for (let i = 0; i < wordCount; i++) {
        const wordLength = Math.floor(Math.random() * 8) + 3; 
        let word = "";
        for (let j = 0; j < wordLength; j++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            word += characters[randomIndex];
        }
        words.push(word);
    }
    
    return words.join(" "); 
}