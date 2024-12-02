import ApiError from "../utils/ApiError.js";

const isAdmin = (req, res, next) => {
    try {
      if (req.user.role !== "admin") { // Check user's role
        throw new ApiError(403, "Access forbidden: Admins only");
      }
      next(); 
    } catch (error) {
      console.error("Error in isAdmin middleware:", error);
      next(error);
    }
  };
  
  export default isAdmin;
  