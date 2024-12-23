"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./routes/products"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};
app.use((0, cors_1.default)(corsOptions));
const PORT = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use('/api', products_1.default);
mongoose_1.default.connect(process.env.MONGODB_URI)
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
    .catch((err) => {
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
