import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
const salt=10;

const app=express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pbhavith1108",
    database:"signup"
})

app.post('/register',(req,res)=>{
   
    const sql="INSERT INTO login1(`name`,`email`,`password`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json({Error:"Error for Hashing password"})
        const values=[req.body.name,req.body.email,hash]
        db.query(sql,[values],(err,result)=>{
            if(err){
                //console.log(err);
                return res.json({Error:"Inserting data Error in server"})
            } 
            return res.json({Status:"success"})
        })
})
    
})

// app.get("/",(req,res)=>{
//     res.send("Hello")
//     console.log("Fromm backend")
// })
app.listen(8081,()=>{
    console.log("Port is running");
})