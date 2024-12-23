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
exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const product_1 = __importDefault(require("./../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search = '', limit = 10, cursor = null } = req.query;
        const filter = search
            ? { name: { $regex: search, $options: 'i' } }
            : {};
        const queryLimit = Number(limit);
        console.log(cursor);
        const queryCursor = cursor ? { _id: { $gt: cursor } } : {};
        const products = yield product_1.default.find(Object.assign(Object.assign({}, filter), queryCursor))
            .sort({ _id: 1 })
            .limit(queryLimit)
            .exec();
        const totalProducts = yield product_1.default.countDocuments(filter);
        const avgPriceResult = yield product_1.default.aggregate([
            { $match: filter },
            { $group: { _id: null, avgPrice: { $avg: "$price" } } }
        ]);
        const avgPrice = avgPriceResult.length > 0 ? avgPriceResult[0].avgPrice : 0;
        const totalPages = Math.ceil(totalProducts / queryLimit);
        res.json({
            products,
            totalProducts,
            totalPages,
            cursor: products.length > 0 ? products[products.length - 1]._id : null,
            avgPrice,
        });
    }
    catch (err) {
        res.status(500).json({ message: err || 'Щось пішло не так' });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        console.log(req);
        if (!product) {
            return res.status(500).json({ message: 'Продукт не знайдено' });
        }
        res.json({
            product
        });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.getProduct = getProduct;
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
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Продукт не знайдено' });
            return;
        }
        const isChanged = Object.keys(req.body).some((key) => {
            return req.body[key] !== product[key];
        });
        if (!isChanged) {
            res.status(200).json({ message: 'Продукт не змінено' });
            console.log('Response sent:', { message: 'Продукт не змінено' });
            return;
        }
        else {
            yield product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({ message: 'Продукт змінено' });
            console.log('Response sent:', { message: 'Продукт змінено' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
});
exports.updateProduct = updateProduct;
