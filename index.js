import express from "express"
import dotenv from 'dotenv';
import connectDB from "./config/DB.js";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { adminRoutes } from "./routes/adminRoutes.js";

const app = express()
dotenv.config()
app.use(express.json());
app.use(cookieParser())
// Routes
app.use('/api/users',userRoute)
app.use('/api/admin',adminRoutes)


// Database connection and Server started
connectDB()
.then(()=>{
    app.listen(`${process.env.PORT}`,()=>{
        console.log("server started at",`${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("connection Error",error);
})
