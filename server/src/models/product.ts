import mongoose, { Schema, Document } from 'mongoose';

interface Product extends Document {
  name: string;
  description: string;
  price: number;
}

const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9]{1,30}$/,
  },
  description: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9\s.,]{1,200}$/,
  },
  price: {
    type: Number,
    required: true,
    match: /^[0-9]{1,4}$/,
  },
});

const Product = mongoose.model<Product>('Product', productSchema);
export default Product;
