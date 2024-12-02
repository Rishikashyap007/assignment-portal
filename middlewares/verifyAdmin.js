import ApiError from "../utils/ApiError.js";

// Middleware to check if the authenticated user has admin privileges
const isAdmin = (req, res, next) => {
  try {
    // Check if the user's role is not "admin"
    if (req.user.role !== "admin") {
      // If the user is not an admin, throw an error with a 403 status code
      throw new ApiError(403, "Access forbidden: Admins only");
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in isAdmin middleware:", error);

    // Pass the error to the next middleware (error handling middleware)
    next(error);
  }
};

export default isAdmin;
