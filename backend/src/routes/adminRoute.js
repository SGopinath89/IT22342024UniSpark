const express = require("express");
const router = express.Router();
const Admin= require("../models/Admin");
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
const name="Admin";
const { studentverifyToken } = require("../security/auth");
const bcrypt = require("bcrypt")
const secretkey = "phyvauac.lk@2024"
const jwt=require('jsonwebtoken')

//Register part
router.post('/register',async (req,res)=>{
    try{
        let {username,password} = req.body

        if(!username || !password){
            return res.status(400).json({error_message:"please provide required feilds"})
        }

        const user = await Admin.findOne({username})

        if(user){
            return res.status(400).json({error_message:"username already taken"})
        }

        const salt = await bcrypt.genSaltSync(10)
        password = await bcrypt.hash(password,salt)

        const result = await Admin.create({username,password})
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

        const user = await Admin.findOne({username})

        if(!user){
            return res.status(400).json({error_message:"Invalid credentials"})
        }

        const passMatch = await bcrypt.compare(password,user.password)

        if(!passMatch){
            return res.status(400).json({error_message:"Invalid credentials"})
        }


        const token = jwt.sign({id:user._id},secretkey)
        return res.status(200).json({token})

    }
    catch(error){
        return res.status(400).json({error_message:error.message})
    }
})


module.exports = router;