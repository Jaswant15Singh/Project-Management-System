const express=require('express');
const {registerUser,loginUser,logoutUser,forgotPassword,refreshToken}=require("../controllers/auth");
const upload = require("../utils/multer");
const router=express.Router();

router.post("/register",upload.single("avatar"),registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.post("/forgot-password",forgotPassword);
router.get("/refresh-token",refreshToken);

module.exports=router;