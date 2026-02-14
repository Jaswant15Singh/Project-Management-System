const express=require("express");
const cors=require("cors");
const app=express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.listen(3000,()=>console.log("listening on 3000"))