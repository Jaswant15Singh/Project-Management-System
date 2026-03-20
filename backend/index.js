const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const cookieParser=require("cookie-parser")
const app=express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());
const authRouter=require("./routers/auth");
app.use("/",(req,res)=>{
    res.send("Welcome to the Project Management System API");
})
app.use("/api/auth",authRouter);
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error:"Something went wrong!"});
});

app.listen(process.env.PORT,()=>console.log(`listenin on port ${process.env.PORT}`))