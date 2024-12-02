import {Router} from "express";
import { getAdmins, LoginUser, RegisterUser, uploadAssignment } from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
const userRoute = Router()

userRoute.route('/register').post(RegisterUser)
userRoute.route('/login').post(LoginUser)
userRoute.route('/upload').post(verifyToken ,uploadAssignment)
userRoute.route('/admin-list').get(verifyToken ,getAdmins)

export default userRoute;