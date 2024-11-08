"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const product_1 = __importDefault(require("./../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, price } = req.body;
    const product = new product_1.default({ name, description, price });
    try {
        yield product.save();
        res.status(201).json(product);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Продукт не знайдено' });
        }
        res.status(204).json({ message: 'Продукт видалено' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = yield product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Продукт не знайдено' });
        }
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.updateProduct = updateProduct;
