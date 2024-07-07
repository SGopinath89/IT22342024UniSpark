const express = require("express");
const router = express.Router();
const Lecturer= require("../models/Lecturer");
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
const name="Lecturer";
const { verifyToken,lecturerverifyToken } = require("../security/auth");
const bcrypt = require("bcrypt")
const secretkey = "phyvauac.lk@2024"
const jwt=require ('jsonwebtoken')

//Register part
router.post('/register',async (req,res)=>{
    try{
        let {username,Password,Department} = req.body

        if(!username || !Password || !Department){
            return res.status(400).json({error_message:"please provide required feilds"})
        }

        const user = await Lecturer.findOne({username})

        if(user){
            return res.status(400).json({error_message:"username already taken"})
        }

        const salt = await bcrypt.genSaltSync(10)
        Password = await bcrypt.hash(Password,salt)

        const result = await Lecturer.create({username,Password,Department})
        return res.status(200).json({result})

    }
    catch(error){
        return res.status(400).json({error_message:error.message})
    }
})

//login part
router.post('/login',async (req,res)=>{
    try{
        let {username,Password} = req.body

        if(!username || !Password){
            return res.status(400).json({error_message:"please provide required feilds"})
        }

        const user = await Lecturer.findOne({username})

        if(!user){
            return res.status(400).json({error_message:"Invalid credentials"})
        }

        const passMatch = await bcrypt.compare(Password,user.Password)

        if(!Password){
            return res.status(400).json({error_message:"Invalid credentials"})
        }


        const token = jwt.sign({username:user.username},secretkey)
        return res.status(200).json({token})

    }
    catch(error){
        return res.status(400).json({error_message:error.message})
    }
})

router.get("/", verifyToken, (req, res) => {
    Service.getAll(res,Lecturer,name).catch((error)=>{
        res.status(500).send("Server Error")
    })
});
router.get("/:id", verifyToken, (req,res)=>{
    Service.getBYId(req,res,Lecturer,name).catch((error)=>{
        res.status(500).send("Server error")
    })
});

router.post("/", verifyToken, (req, res) => {
    const { LecturerId,Password,name,Department } = req.body;
    if (!LecturerId || !Password || !name || !Department ) {
    res.status(404).send("Please provide required fields");
    } else {
        Service.add(res,Lecturer,{LecturerId,Password,name,Department}).catch((error)=>{
            res.status(500).send("Server  error")
        })
    } 
});

router.delete("/:id",lecturerverifyToken,(req,res)=>{
    Service.deleteById(req,res,Lecturer,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
});

router.put("/:id", lecturerverifyToken, async(req, res) => {
    const id = req.params.id;
    const lecturers = await Lecturer.findById(id).catch((error) => {
    console.error(error);
    });
    if (!lecturers) {
    res.status(404).send("Author Not found");
    } else {
    const { LecturerId,Password,name,Department } = req.body;
    if (!LecturerId || !Password || !name || !Department) {
        res.status(400).send("Please provide required fields");
    } else {
        Service.update(res,lecturers,{LecturerId,Password,name,Department}).catch((error)=>{
            res.status(500).send(error+"Server Error")
           })
        
    }
    }
});

module.exports = router;