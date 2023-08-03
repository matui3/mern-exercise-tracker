import express from "express"
import cors from "cors" // what is this

import dotenv from 'dotenv' // need to look up
import mongoose from 'mongoose'
import exerciseRoutes from './routes/exercises.js';
import userRoutes from './routes/users.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// CONFIGURATION
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors())

// ROUTES

app.use('/exercises', exerciseRoutes);
app.use('/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

// MONGOOSE SETUP
const uri = process.env.ATLAS_URI
const port = process.env.PORT || 5000;
main().catch(err => console.log(err));


async function main() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(port, () => console.log(`Server Port: ${port}`))
    } catch(err) {
        console.log(`${err} did not connect`)
    }
    
}
