const express = require("express");
const router = express.Router();
const Course= require("../models/Course");
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
//const { verifyToken } = require("../security/auth");
const name="Course";

router.get("/", verifyToken, (req, res) => {
    Service.getAll(res,Course,name).catch((error)=>{
        res.status(500).send("Server Error")
    })
});
router.get("/:id", verifyToken, (req,res)=>{
    Service.getBYId(req,res,Course,name).catch((error)=>{
        res.status(500).send("Server error")
    })
});

router.post("/", verifyToken, (req, res) => {
    const { Course_Id,Course_name } = req.body;
    if (!Course_Id || !Course_name) {
    res.status(404).send("Please provide required fields");
    } else {
        Service.add(res,Course,{Course_Id,Course_name}).catch((error)=>{
            res.status(500).send("Server  error")
        })
    } 
});

router.delete("/:id",verifyToken,(req,res)=>{
    Service.deleteById(req,res,Course,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
});

router.put("/:id", verifyToken, async(req, res) => {
    const id = req.params.id;
    const courses = await Course.findById(id).catch((error) => {
    console.error(error);
    });
    if (!courses) {
    res.status(404).send("Author Not found");
    } else {
    const {Course_Id,Course_name} = req.body;
    if (!Course_Id || !Course_name) {
        res.status(400).send("Please provide required fields");
    } else {
        Service.update(res,courses,{Course_Id,Course_name}).catch((error)=>{
            res.status(500).send(error+"Server Error")
           })
        
    }
    }
});

module.exports = router;