import express from "express";
import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

router.route("/")
    .get(authController.get);

router.post("/requestResetPassword", authController.resetPasswordRequestController);  
router.post("/resetPassword/:id", authController.resetPasswordController);    
    


export default router;
