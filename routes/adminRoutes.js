import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { acceptAssignment, getAssignments, rejectAssignment } from "../controllers/assignmentController.js";
import isAdmin from "../middlewares/verifyAdmin.js";
import { LoginUser, RegisterUser } from "../controllers/userController.js";
export const adminRoutes = Router()

adminRoutes.route('/register').post(RegisterUser)
adminRoutes.route('/login').post(LoginUser)
adminRoutes.route('/assignments').get(verifyToken,isAdmin,getAssignments)
adminRoutes.route('/assignments/:id/accept').post(verifyToken,isAdmin,acceptAssignment)
adminRoutes.route('/assignments/:id/reject').post(verifyToken,isAdmin,rejectAssignment)