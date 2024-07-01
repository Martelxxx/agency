import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';

import userRouter from './src/Routes/user.js';
import projectRouter from './src/Routes/project.js';
import messageRouter from './src/Routes/message.js';


const app = express();
const PORT = process.env.PORT || 5010;

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
  
// Handle preflight requests
app.options('*', cors());

// Session configuration
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
}));

// User router
app.use('/api/user', userRouter);

// Project router
app.use('/api/project', projectRouter);

// Update region router
app.use('/api/user/updateRegion', userRouter);

// Message sending router
app.use('/api/message', messageRouter);

app.use('/api/users', userRouter);
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
