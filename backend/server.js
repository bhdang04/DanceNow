import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);
app.use(errorHandler);

// db Password: F1e7nVybApriBFJY 

export default app