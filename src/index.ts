import express from "express";
// import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";
const JWT_PASSWORD = "Adarsh@2025"
const app = express();
app.use(express.json());

app.post("/app/v1/SignUp", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

try{
    await UserModel.create({
        username: username,
        password: password
    })
    res.status(200).json({
        message: `Hello User, Your are signed in`
    })

    }catch(e){
        res.status(411).json({
            message: "User of already exists"
        })
}
})

app.post("/app/v1/SignIn", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const existngUser = await UserModel.findOne({
        username,
        password
    })
    if(existngUser){
        const token = jwt.sign({
            id: existngUser._id
        }, JWT_PASSWORD)
        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "incorrect credentials"
        })
    }

})

app.post("/app/v1/share", (req, res) => {

})

app.get("/app/v1/sharelink", (req, res) => {

})

app.listen(3000, ()=>{
    console.log("Litsning to port 3000");
    
})