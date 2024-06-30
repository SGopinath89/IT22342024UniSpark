const express = require("express");
const router = express.Router();
const Lecturer= require("../models/Student");
//const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
const name="Student";
const { verifyToken } = require("../security/auth");
const bcrypt = require("bcrypt")
const secretkey = "phyvauac.lk@2024"

//Register part
router.post('/register',async (req,res)=>{
    try{
        let {username,password} = req.body

        if(!username || !password){
            return res.status(400).json({error_message:"please provide required feilds"})
        }

        const user = await Student.findOne({username})

        if(user){
            return res.status(400).json({error_message:"username already taken"})
        }

        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password,salt)

        const result = await Student.create({username,password})
        return res.status(200).json({result})

    }
    catch(error){
        return res.status(400).json({error_message:error.message})
    }
})

//login part
router.post('/login',async (req,res)=>{
    try{
        let {username,password} = req.body

        if(!username || !password){
            return res.status(400).json({error_message:"please provide required feilds"})
        }

        const user = await Student.findOne({username})

        if(!user){
            return res.status(400).json({error_message:"Invalid credentials"})
        }

        const passMatch = await bcrypt.compare(password,Student.password)

        if(!password){
            return res.status(400).json({error_message:"Invalid credentials"})
        }


        const token = jwt.sign({username:Student.username},secretkey)
        return res.status(200).json({token})

    }
    catch(error){
        return res.status(400).json({error_message:error.message})
    }
})



module.exports = router;