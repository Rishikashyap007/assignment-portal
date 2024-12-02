import { Assignment } from "../models/assignmentModel.js";
import { User } from "../models/userModel.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';


export const RegisterUser = async (req, res) => {
   try {
     const { username, email, password, role } = req.body;
 
     // Validation
     if (!username || !email || !password || !role) {
       throw new ApiError(400, "All fields are required");
     }
 
     if (!["user", "admin"].includes(role)) {
       throw new ApiError(400, "Invalid role. Must be 'user' or 'admin'");
     }
 
     // Check if user already exists
     const existedUser = await User.findOne({ email });
     if (existedUser) {
       throw new ApiError(409, "User with this email already exists");
     }
 
     // Hash password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
 
     // Create user
     const user = await User.create({
       username,
       email,
       password: hashedPassword,
       role,
     });
 
     const createdUser = await User.findById(user._id).select("-password");
 
     if (!createdUser) {
       throw new ApiError(500, "Server error while fetching created user");
     }
 
     res.status(201).json(
       new ApiResponse(201, createdUser, "User created successfully!")
     );
   } catch (error) {
     console.error(error);
     res.status(error.statusCode || 500).json(
       new ApiError(error.statusCode || 500, error.message || "Internal Server Error")
     );
   }
 };
 
export const LoginUser = async (req, res) => {
   try {
     const { email, password } = req.body;
 
     // Validation
     if (!email || !password) {
       throw new ApiError(400, "Email and password are required");
     }
 
     const user = await User.findOne({ email });
 
     if (!user) {
       throw new ApiError(404, "User not found");
     }
 
     const isVerified = await bcrypt.compare(password, user.password);
 
     if (!isVerified) {
       throw new ApiError(401, "Incorrect password");
     }
 
     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
 
     const loggedinUser = await User.findById(user._id).select("-password");
 
     if (!loggedinUser) {
       throw new ApiError(500, "Server error while fetching logged-in user");
     }
 
     const options = {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production", // Secure only in production
       sameSite: "strict",
     };
 
     res
       .status(200)
       .cookie("userToken", token, options)
       .json(
         new ApiResponse(200, { loggedinUser, token }, "User logged in successfully!")
       );
   } catch (error) {
     console.error(error);
     res.status(error.statusCode || 500).json(
       new ApiError(error.statusCode || 500, error.message || "Internal Server Error")
     );
   }
 };
 
export const uploadAssignment = async (req, res) => {
   try {
     console.log("Request Body:", req.body);
     console.log("Authenticated User:", req.user);
 
     const { task, admin } = req.body;
     if (!task || !admin) {
       throw new ApiError(400, "All fields are required.");
     }
 
     const adminUser = await User.findOne({ username: admin });
     if (!adminUser) {
       throw new ApiError(404, "Admin not found.");
     }
     if (!req.user || !req.user._id) {
       throw new ApiError(401, "Unauthorized. User not authenticated.");
     }
      console.log(adminUser,"adminUser");
     const assignment = new Assignment({
       userId: req.user._id,
       task,
       adminId: adminUser._id,
     });
 
     const savedAssignment = await assignment.save();
 
     res
       .status(201)
       .json(
         new ApiResponse(201, savedAssignment, "Assignment uploaded successfully!")
       );
   } catch (error) {
     console.error("Error:", error);
 
     res
       .status(error.statusCode || 500)
       .json(
         new ApiError(
           error.statusCode || 500,
           error.message || "Internal Server Error"
         )
       );
   }
 };
 
 export const getAdmins = async(req,res) =>{
   try {
      const admins = await User.find({ role: "admin" });
      if(!admins){
         throw new ApiError(404,"admins not found ")
      }
      res.status(200).json(new ApiResponse(200,admins,"Admins list fetched successfully!"))

   } catch (error) {
      console.error("Error:", error);
 
      res
        .status(error.statusCode || 500)
        .json(
          new ApiError(
            error.statusCode || 500,
            error.message || "Internal Server Error"
          )
        );
   }
 }

