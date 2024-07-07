const express = require("express");
const router = express.Router();
const Chat= require("../models/Chat");
const Instructor= require("../models/Instructor");
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
const { studentverifyToken, instructorverifyToken } = require("../security/auth");
const name="Chat";

router.get("/", instructorverifyToken, (req, res) => {
    Service.getAll(res,Chat,name).catch((error)=>{
        res.status(500).send("Server Error")
    })
});
router.get("/:id", instructorverifyToken, (req,res)=>{
    Service.getBYId(req,res,Chat,name).catch((error)=>{
        res.status(500).send("Server error")
    })
});

router.post("/", studentverifyToken, (req, res) => {
    const StudentId=req.user._id;
    const { Message,InstructorId } = req.body;
    if (!Message || !InstructorId) {
    res.status(404).send("Please provide required fields");
    } else {
        Service.add(res,Chat,{Message,StudentId,InstructorId}).catch((error)=>{
            res.status(500).send("Server  error")
        })
    } 
});

router.delete("/:id",instructorverifyToken,(req,res)=>{
    Service.deleteById(req,res,Chat,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
});

module.exports = router;