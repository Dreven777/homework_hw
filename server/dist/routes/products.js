"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get('/products', product_1.getProducts);
router.get('/product/:id', product_1.getProduct);
router.post('/product', [
    (0, express_validator_1.check)('name')
        .matches(/^[a-zA-Z0-9]{1,30}$/)
        .withMessage('Назва товару має бути від 1 до 30 символів'),
    (0, express_validator_1.check)('description')
        .matches(/^[a-zA-Z0-9\s.,]{1,200}$/)
        .withMessage('Опис товару має бути від 1 до 200 символів'),
    (0, express_validator_1.check)('price')
        .matches(/^[0-9]{1,4}$/)
        .withMessage('Ціна товару має бути від 1 до 9999'),
], product_1.createProduct);
router.delete('/product/:id', product_1.deleteProduct);
router.put('/product/:id', [
    (0, express_validator_1.check)('name')
        .matches(/^[a-zA-Z0-9]{1,30}$/)
        .withMessage('Назва товару має бути від 1 до 30 символів'),
    (0, express_validator_1.check)('description')
        .matches(/^[a-zA-Z0-9\s.,]{1,200}$/)
        .withMessage('Опис товару має бути від 1 до 200 символів'),
    (0, express_validator_1.check)('price')
        .matches(/^[0-9]{1,4}$/)
        .withMessage('Ціна товару має бути від 1 до 9999'),
], product_1.updateProduct);
exports.default = router;
