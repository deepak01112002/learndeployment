const express = require("express")
const UserModel = require("../Model/user.model")
var jwt = require('jsonwebtoken');
const UserRoute = express.Router()
const bcrypt = require('bcrypt');

UserRoute.post("/register", async (req,res)=>{
    const {pass} = req.body
    try {
        bcrypt.hash(pass, 5, async(err, hash)=> {
            const data = new UserModel({...req.body,pass:hash})
            await data.save()
            res.send({"msg":"User is Added"})
        });
        
    } catch (error) {
        res.send(error)
    }
})

UserRoute.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try {
       const data = await UserModel.find({email})
       if(data.length>0){
        bcrypt.compare(pass, data[0].pass, (err, result)=> {
            if(result){
                var token = jwt.sign({authorId : data[0]._id, author : data[0].name}, 'deepakpandey');
                res.send({"msg" : "Login Successful","token" : token})
            }else{
                res.send({'msg' : "Wrong Credential"})
            }
            
        });
       
       } 
    } catch (error) {
        res.send({"msg" : error})
    }
})

module.exports = UserRoute