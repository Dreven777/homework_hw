import express from 'express';
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/product';
import { check } from 'express-validator';

const router = express.Router();

router.get('/products', getProducts);

router.post(
  '/product',
  [
    check('name')
      .matches(/^[a-zA-Z0-9]{1,30}$/)
      .withMessage('Назва товару має бути від 1 до 30 символів'),
    check('description')
      .matches(/^[a-zA-Z0-9\s.,]{1,200}$/)
      .withMessage('Опис товару має бути від 1 до 200 символів'),
    check('price')
      .matches(/^[0-9]{1,4}$/)
      .withMessage('Ціна товару має бути від 1 до 9999'),
  ],
  createProduct
);

router.delete('/product/:id', deleteProduct);

router.put(
  '/product/:id',
  [
    check('name')
      .matches(/^[a-zA-Z0-9]{1,30}$/)
      .withMessage('Назва товару має бути від 1 до 30 символів'),
    check('description')
      .matches(/^[a-zA-Z0-9\s.,]{1,200}$/)
      .withMessage('Опис товару має бути від 1 до 200 символів'),
    check('price')
      .matches(/^[0-9]{1,4}$/)
      .withMessage('Ціна товару має бути від 1 до 9999'),
  ],
  updateProduct
);

export default router;
