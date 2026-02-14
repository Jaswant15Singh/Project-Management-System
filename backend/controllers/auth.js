const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const pool=require("../config/database");

const registerUser=async(req,res)=>{
    try {
        const {name,description,owner_id,startDate,endDate,status,visibility}=req.body;
    } catch (error) {
        
    }
}

const loginUser=async(req,res)=>{

}

const logoutUser=async(req,res)=>{

}

const forgotPassword=async(req,res)=>{

}

const refreshToken=async(req,res)=>{

}

module.exports={registerUser,loginUser,logoutUser,forgotPassword,refreshToken};