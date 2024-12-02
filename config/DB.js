import mongoose, { connect } from "mongoose"; 
// Importing Mongoose library and the `connect` method to establish a database connection

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempting to connect to the database using the connection URL from environment variables
    await connect(`${process.env.DB_URL}/assignment-portal`);
    /*
      - `process.env.DB_URL`: Retrieves the base database URL from environment variables
      - `/assignment-portal`: Specifies the database name to use
      - Ensures a dynamic configuration for different environments (e.g., development, production)
    */

    console.log("Database Connected Successfully");
    // Logs a success message to the console upon a successful connection
  } catch (error) {
    // Handling connection errors
    console.log("Connection error, please check it in db.js:", error);
    /*
      - Provides detailed feedback in case the connection fails
      - Helps developers identify issues quickly, such as incorrect credentials or a missing database server
    */
  }
};

export default connectDB;
// Exporting the `connectDB` function to be used in the main application file or other parts of the app
