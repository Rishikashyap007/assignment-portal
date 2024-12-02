import { Router } from "express"; // Importing the Express Router to define routes
import verifyToken from "../middlewares/verifyToken.js"; // Middleware to verify JWT tokens
import { 
  acceptAssignment, 
  getAssignments, 
  rejectAssignment 
} from "../controllers/assignmentController.js"; // Assignment controller functions
import isAdmin from "../middlewares/verifyAdmin.js"; // Middleware to check admin role
import { LoginUser, RegisterUser } from "../controllers/userController.js"; // User controller functions

// Create a new router for admin-related routes
export const adminRoutes = Router();

// Route to register a new user
adminRoutes.route('/register').post(RegisterUser);
/*
  POST /register
  - Calls the `RegisterUser` controller function
  - Handles the logic for registering new users
*/

// Route to login a user
adminRoutes.route('/login').post(LoginUser);
/*
  POST /login
  - Calls the `LoginUser` controller function
  - Handles user authentication and token generation
*/

// Route to get all assignments (admin-only access)
adminRoutes.route('/assignments').get(verifyToken, isAdmin, getAssignments);
/*
  GET /assignments
  - Middleware:
    1. `verifyToken`: Ensures the request has a valid JWT token
    2. `isAdmin`: Ensures the authenticated user has an admin role
  - Calls the `getAssignments` controller function
  - Fetches a list of all assignments
*/

// Route to accept a specific assignment (admin-only access)
adminRoutes.route('/assignments/:id/accept').post(verifyToken, isAdmin, acceptAssignment);
/*
  POST /assignments/:id/accept
  - Middleware:
    1. `verifyToken`: Ensures the request has a valid JWT token
    2. `isAdmin`: Ensures the authenticated user has an admin role
  - Calls the `acceptAssignment` controller function
  - Accepts the assignment identified by `:id`
*/

// Route to reject a specific assignment (admin-only access)
adminRoutes.route('/assignments/:id/reject').post(verifyToken, isAdmin, rejectAssignment);
/*
  POST /assignments/:id/reject
  - Middleware:
    1. `verifyToken`: Ensures the request has a valid JWT token
    2. `isAdmin`: Ensures the authenticated user has an admin role
  - Calls the `rejectAssignment` controller function
  - Rejects the assignment identified by `:id`*/
