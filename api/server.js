import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());  
app.use(express.json()); 

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB is Connected!'))
.catch(err => console.log(err));


// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}...`)
});