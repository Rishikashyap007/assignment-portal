import { Router } from "express"; // Importing the Express Router for creating route definitions
import { 
  getAdmins, 
  LoginUser, 
  RegisterUser, 
  uploadAssignment 
} from "../controllers/userController.js"; // Importing controller functions
import verifyToken from "../middlewares/verifyToken.js"; // Middleware to verify JWT tokens

// Create a new router instance for user-related routes
const userRoute = Router();

// Route to register a new user
userRoute.route('/register').post(RegisterUser);
/*
  POST /register
  - Calls the `RegisterUser` controller function
  - Handles user registration by accepting user details (username, email, password, role)
  - Returns a success message or error if the process fails
*/

// Route to login a user
userRoute.route('/login').post(LoginUser);
/*
  POST /login
  - Calls the `LoginUser` controller function
  - Handles user authentication by verifying email and password
  - Returns a JWT token for authenticated sessions
*/

// Route to upload an assignment
userRoute.route('/upload').post(verifyToken, uploadAssignment);
/*
  POST /upload
  - Middleware:
    1. `verifyToken`: Ensures the request has a valid JWT token
  - Calls the `uploadAssignment` controller function
  - Allows authenticated users to upload assignments
*/

// Route to get a list of all admins
userRoute.route('/admin-list').get(verifyToken, getAdmins);
/*
  GET /admin-list
  - Middleware:
    1. `verifyToken`: Ensures the request has a valid JWT token
  - Calls the `getAdmins` controller function
  - Returns a list of all users with the "admin" role
*/

// Exporting the router for use in other parts of the application
export default userRoute;
