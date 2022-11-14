import express from "express";
import mongoose from "mongoose";
import authRoutes from "./auth/authRoutes.js";
import cors from "cors";
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import goodsRouter from "./goods/goods-router.js";
import errorMiddleware from "./auth/middleware/error-middleware.js";
import customerRouter from "./customer/customer-router.js";
import {fileURLToPath} from 'url';
import * as path from 'path';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const publicPath = path.join(__dirname, '..', 'user', 'build');


const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/goods', goodsRouter);
app.use('/customer', customerRouter);
app.use(express.static(publicPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})
app.use(errorMiddleware);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`The post has been started on PORT ${PORT}`));

    } catch (e) {
        console.log(e)
    }
}

start();
