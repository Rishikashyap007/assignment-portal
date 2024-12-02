import express from "express"; 
// Importing the Express framework for building the web application

import dotenv from 'dotenv'; 
// Importing dotenv to manage environment variables

import connectDB from "./config/DB.js"; 
// Importing the database connection function

import userRoute from "./routes/userRoutes.js"; 
// Importing the user-related routes

import cookieParser from "cookie-parser"; 
// Importing cookie-parser middleware to parse cookies from incoming requests

import { adminRoutes } from "./routes/adminRoutes.js"; 
// Importing the admin-related routes

const app = express(); // Initializing the Express application

dotenv.config(); 
// Loading environment variables from a `.env` file

app.use(express.json()); 
// Middleware to parse incoming JSON payloads in requests

app.use(cookieParser()); 
// Middleware to parse cookies from HTTP requests

// Setting up the routes
app.use('/api/users', userRoute); 
// Route for user-related operations (e.g., login, registration, assignment uploads)

app.use('/api/admin', adminRoutes); 
// Route for admin-related operations (e.g., managing assignments)

// Connecting to the database and starting the server
connectDB()
  .then(() => {
    // If the database connection is successful, start the server
    app.listen(`${process.env.PORT}`, () => {
      console.log("Server started at", `${process.env.PORT}`);
      /*
        - Logs a message indicating the server is running
        - Uses the PORT value from environment variables
      */
    });
  })
  .catch((error) => {
    // If there is an error in connecting to the database, log it
    console.log("Connection Error:", error);
  });
