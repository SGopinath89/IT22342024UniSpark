const express = require("express");
const router = express.Router();
const Subject= require("../models/Subject");
const Course= require("../models/Course");
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
const {studentverifyToken, lecturerverifyToken,verifyToken} = require("../security/auth");
const name="Subject";

router.get("/", verifyToken, (req, res) => {
    
    Service.getAll(res,Subject,name).catch((error)=>{
        res.status(500).send(error+"Service error")

    })
});


router.get("/:id", verifyToken,(req,res)=>{
    Service.getBYId(req,res,Subject,name).catch((error)=>{
        res.status(500).send("Server error")
    })
});

//create subject
router.post("/", lecturerverifyToken, (req, res) => {
    const {SubjectCode,Subjectname,Course_ID} = req.body;
    if (!SubjectCode || !Subjectname || !Course_ID) {
    res.status(404).send("Please provide required fields");
    } else {
        Service.add(res,Subject,{SubjectCode,Subjectname,Course_ID}).catch((error)=>{
            res.status(500).send("Server")
        })
    } 
});

router.delete("/:id",lecturerverifyToken,(req,res)=>{
    Service.deleteById(req,res,Subject,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
})

router.put("/:id", lecturerverifyToken, async(req, res) => {
    const id = req.params.id;
    const subjects = await Subject.findById(id).catch((error) => {
    console.error(error);
    });
    if (!subjects) {
    res.status(404).send("Book Not found");
    } else {
    const {SubjectCode,Subjectname} = req.body;
    if (!SubjectCode || !Subjectname) {
        res.status(400).sent("Please provide required fields");
    } else {
        try {
            subjects.SubjectCode=SubjectCode;
            subjects.Subjectname=Subjectname;
        const result = await books.save();
        res.status(200).json(result);
        } catch (error) {
        res.status(500).json(error);
            }
    }
    }
});

module.exports = router;