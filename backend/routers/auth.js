const express=require('express');
const {registerUser,loginUser,logoutUser,forgotPassword,refreshToken}=require("../controllers/auth")
const router=express.Router();

router.get("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.post("/forgot-password",forgotPassword);
router.post("/refresh-token",refreshToken);

module.exports=router;