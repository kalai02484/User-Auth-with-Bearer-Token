import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/dbConfig.js';
import userAuthRouter from './views/userAuthRouter.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the User Authentication API with Bearer Token!');
});

//custom routes

app.use('/api/auth', userAuthRouter);


// Port configuration
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
