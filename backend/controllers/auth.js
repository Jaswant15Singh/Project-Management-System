const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const pool=require("../config/database");
const getRefreshToken=require("../utils/token");
const registerUser=async(req,res,next)=>{
    try {    
        const {name,email,password,role,phone}=req.body;
        const isEmailPresent=await pool.query("SELECT * FROM Users WHERE email=$1",[email]);        
        if(isEmailPresent.rows.length>0){
            return res.status(400).json({message:"Email already exists"});
        }
        const avatar="/uploads/avatar/"+req.file.filename;
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);
        const result=await pool.query("INSERT INTO Users (name,email,password,role,phone,avatar) VALUES ($1,$2,$3,$4,$5,$6)",[name,email,hashedPassword,role,phone,avatar]);        
        res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        next(error);
    }
}

const loginUser=async(req,res,next)=>{
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM Users WHERE email=$1", [
          email,
        ]);
        if (user.rows.length === 0) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          user.rows[0].password,
        );
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
          {
            id: user.rows[0].id,
            name:user.rows[0].name,
            role: user.rows[0].role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "15min" },
        );

         const refreshToken = jwt.sign(
           { id: user.rows[0].id },
           process.env.JWT_SECRET,
           { expiresIn: "7d" },
         );

        // global.refreshTokens = refreshToken;        
        res.cookie("token",token,{
          httpOnly:true,
          secure:process.env.NODE_ENV==="production",
          sameSite:"strict",
          secure:true,
        })     

         res.cookie("refreshToken", refreshToken, {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: "strict",
           secure: true,
         });
        
        res.cook
        res.status(200).json({ "message":"logged in successfully" });
    } catch (error) {
        next(error)
    }
}

const logoutUser=async(req,res)=>{
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error)
  }
}

const forgotPassword=async(req,res)=>{

}

const refreshToken=async(req,res)=>{
  console.log(1);
  
  try {  const refreshToken =req.headers.refreshToken.split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }   
    
    const token=jwt.verify(refreshToken,process.env.JWT_SECRET);
    if (!token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    next();
    console.log("test");
     
  }catch(error){
    next(error);
  }
}

module.exports={registerUser,loginUser,logoutUser,forgotPassword,refreshToken};