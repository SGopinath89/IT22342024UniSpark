const express = require("express");
const router = express.Router();
const Lecturer= require("../models/Student");
const Service = require("../service/GenericService")
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

router.get("/", verifyToken, (req, res) => {
    Service.getAll(res,Student,name).catch((error)=>{
        res.status(500).send("Server Error")
    })
});
router.get("/:id", verifyToken, (req,res)=>{
    Service.getBYId(req,res,Student,name).catch((error)=>{
        res.status(500).send("Server error")
    })
});

router.post("/", verifyToken, (req, res) => {
    const {StudentId,Password,name,Department} = req.body;
    if (!StudentId || !Password || !name || !Department) {
    res.status(404).send("Please provide required fields");
    } else {
        Service.add(res,Student,{StudentId,Password,name,Department}).catch((error)=>{
            res.status(500).send("Server  error")
        })
    } 
});

router.delete("/:id",verifyToken,(req,res)=>{
    Service.deleteById(req,res,Student,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
});

router.put("/:id", verifyToken, async(req, res) => {
    const id = req.params.id;
    const students = await Student.findById(id).catch((error) => {
    console.error(error);
    });
    if (!students) {
    res.status(404).send("Author Not found");
    } else {
    const {StudentId,Password,name,Department} = req.body;
    if (!StudentId || !Password || !name || !Department) {
        res.status(400).send("Please provide required fields");
    } else {
        Service.update(res,students,{StudentId,Password,name,Department}).catch((error)=>{
            res.status(500).send(error+"Server Error")
           })
        
    }
    }
});


module.exports = router;