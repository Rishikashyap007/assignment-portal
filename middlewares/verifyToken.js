// first we will get the token from the headers or cokkies
// then decode the token using jwt verify
// then find the user using the id we send in the payload of the token 
// and send that user to next controller and finally the next to shift the control to the next controller 

import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/userModel.js";


const verifyToken = async(req,res,next)=>{
  try {
     const token  = req.cookies?.userToken;

     if(!token){
        throw new ApiError(401,"User not authorized")
     }

     const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

     if(!decodedToken){
        throw new ApiError(401,"User not authorized")
     }

     const user = await User.findById(decodedToken.id)

     if(!user){
        throw new ApiError(404,"User not Found")
     }
     req.user = user;
     next()
  } catch (error) {
    console.error("Error in verifyjwt middleware:", error); 
    next(error);
  }
}

export default verifyToken;