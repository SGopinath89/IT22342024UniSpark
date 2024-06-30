const express = require("express");
const router = express.Router();
const Quiz= require("../models/Quiz");
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
//const { verifyToken } = require("../security/auth");
const name="Quiz";

router.get("/", verifyToken, (req, res) => {
    Service.getAll(res,Quiz,name).catch((error)=>{
        res.status(500).send("Server Error")
    })
});

router.get("/:id", verifyToken, (req,res)=>{
    Service.getBYId(req,res,Quiz,name).catch((error)=>{
        res.status(500).send("Server error")
    })
});

router.post("/", verifyToken, (req, res) => {
    const {questions} = req.body;
    if (!questions) {
    res.status(404).send("Please provide required fields");
    } else {
        Service.add(res,Quiz,{questions}).catch((error)=>{
            res.status(500).send("Server  error")
        })
    } 
});

router.delete("/:id",verifyToken,(req,res)=>{
    Service.deleteById(req,res,Quiz,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
});

router.put("/:id", verifyToken, async(req, res) => {
    const id = req.params.id;
    const quizes = await Quiz.findById(id).catch((error) => {
    console.error(error);
    });
    if (!quizes) {
    res.status(404).send("Author Not found");
    } else {
    const {questions} = req.body;
    if (!questions) {
        res.status(400).send("Please provide required fields");
    } else {
        Service.update(res,quizes,{questions}).catch((error)=>{
            res.status(500).send(error+"Server Error")
           })
        
    }
    }
});

module.exports = router;