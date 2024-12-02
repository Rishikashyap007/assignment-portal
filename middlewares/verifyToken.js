import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/userModel.js";

// Middleware to verify JWT token and authorize users
const verifyToken = async (req, res, next) => {
  try {
    // Extract the token from cookies
    const token = req.cookies?.userToken;

    // Check if the token exists
    if (!token) {
      // If no token is provided, throw an authorization error
      throw new ApiError(401, "User not authorized");
    }

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // If the token cannot be verified, throw an authorization error
    if (!decodedToken) {
      throw new ApiError(401, "User not authorized");
    }

    // Find the user in the database using the ID from the decoded token
    const user = await User.findById(decodedToken.id);

    // If no user is found, throw a "User not found" error
    if (!user) {
      throw new ApiError(404, "User not Found");
    }

    // Attach the user object to the request object for further use
    req.user = user;

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in verifyToken middleware:", error);

    // Pass the error to the next middleware (error handling middleware)
    next(error);
  }
};

export default verifyToken;
