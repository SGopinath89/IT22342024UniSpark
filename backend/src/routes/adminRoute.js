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

        const salt = await bcrypt.genSalt()
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

        const passMatch = await bcrypt.compare(password,Admin.password)

        if(!passMatch){
            return res.status(400).json({error_message:"Invalid credentials"})
        }


        const token = jwt.sign({username:user.username},secretkey)
        return res.status(200).json({token})

    }
    catch(error){
        return res.status(400).json({error_message:error.message})
    }
})

router.get("/", studentverifyToken, (req, res) => {
    Service.getAll(res,Admin,name).catch((error)=>{
        res.status(500).send("Server Error")
    })
});
router.get("/:id", studentverifyToken, (req,res)=>{
    Service.getBYId(req,res,Admin,name).catch((error)=>{
        res.status(500).send("Server error")
    })
});

router.post("/", studentverifyToken, (req, res) => {
    const { AdminId,Password,Name } = req.body;
    if (!AdminId || !Password || !Name) {
    res.status(404).send("Please provide required fields");
    } else {
        Service.add(res,Admin,{AdminId,Password,Name}).catch((error)=>{
            res.status(500).send("Server  error")
        })
    } 
});

router.delete("/:id",studentverifyToken,(req,res)=>{
    Service.deleteById(req,res,Admin,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
});

router.put("/:id", studentverifyToken, async(req, res) => {
    const id = req.params.id;
    const admins = await Admin.findById(id).catch((error) => {
    console.error(error);
    });
    if (!admins) {
    res.status(404).send("Author Not found");
    } else {
    const { AdminId,Password,Name } = req.body;
    if (!AdminId || !Password || !Name) {
        res.status(400).send("Please provide required fields");
    } else {
        Service.update(res,admins,{AdminId,Password,Name}).catch((error)=>{
            res.status(500).send(error+"Server Error")
           })
        
    }
    }
});

module.exports = router;