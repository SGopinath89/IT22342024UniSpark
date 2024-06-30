const express = require("express");
const router = express.Router();
const Chat= require("../models/Chat");
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
//const { verifyToken } = require("../security/auth");
const name="Chat";

router.get("/", verifyToken, (req, res) => {
    Service.getAll(res,Chat,name).catch((error)=>{
        res.status(500).send("Server Error")
    })
});
router.get("/:id", verifyToken, (req,res)=>{
    Service.getBYId(req,res,Chat,name).catch((error)=>{
        res.status(500).send("Server error")
    })
});

router.post("/", verifyToken, (req, res) => {
    const { Message } = req.body;
    if (!Message) {
    res.status(404).send("Please provide required fields");
    } else {
        Service.add(res,Chat,{Message}).catch((error)=>{
            res.status(500).send("Server  error")
        })
    } 
});

router.delete("/:id",verifyToken,(req,res)=>{
    Service.deleteById(req,res,Chat,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
});

router.put("/:id", verifyToken, async(req, res) => {
    const id = req.params.id;
    const chats = await Chat.findById(id).catch((error) => {
    console.error(error);
    });
    if (!chats) {
    res.status(404).send("Author Not found");
    } else {
    const {Message} = req.body;
    if (!Message) {
        res.status(400).send("Please provide required fields");
    } else {
        Service.update(res,chats,{Message}).catch((error)=>{
            res.status(500).send(error+"Server Error")
           })
        
    }
    }
});

module.exports = router;