const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const app=express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(morgan("dev"));
const authRouter=require("./routers/auth");
app.use("/api/auth",authRouter);
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error:"Something went wrong!"});
});
app.listen(process.env.PORT,()=>console.log(`listening on port ${process.env.PORT}`))