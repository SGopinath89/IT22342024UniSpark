const express = require("express");
const router = express.Router();
const multer = require('multer');
const Subject= require("../models/Subject");
const Resource=require("../models/Resource"); 
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
const { studentverifyToken,lecturerverifyToken,verifyToken } = require("../security/auth");
const name="Resource";

const storage= multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname + '-' + Date.now());
    }
});
const upload= multer({ storage:storage });

//get resource by subject id
router.get('/sub/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the Subject exists
        const subject = await Subject.findById(id);
        if (!subject) {
            return res.status(404).send('Subject not found');
        }

        // Fetch resources associated with the Subject ID using a service or directly querying
        const resources = await Resource.find({ SubjectId: id });

        res.status(200).json(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).send('Server error');
    }
});


//get all resources
router.get("/",studentverifyToken, lecturerverifyToken,(req, res) => {
    Service.getAll(res,Resource,name).catch((error)=>{
        res.status(500).send("Server Error")
    })
});

//get resource by id
router.get("/:id",studentverifyToken, lecturerverifyToken,(req,res)=>{
    Service.getBYId(req,res,Resource,name).catch((error)=>{
        res.status(500).send("Server error")
    })
});

//add file to db
router.post('/:id', upload.single('resource'), async (req, res) => {
    const { id } = req.params;
    const { type, url } = req.body;

    try {
        // Check if the Subject exists
        const subject = await Subject.findById(id);
        if (!subject) {
            return res.status(404).send('Subject not found');
        }

        // Create a new Resource document
        const newResource = new Resource({
            type,
            url,
            SubjectId: id
        });

        // Save the Resource document
        const savedResource = await newResource.save();

        res.status(201).send(savedResource);
    } catch (err) {
        res.status(400).send(err);
    }
});
//delete resource
router.delete("/:id",lecturerverifyToken,(req,res)=>{
    Service.deleteById(req,res,Resource,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
});
//update resource
router.put("/:id",lecturerverifyToken, async(req, res) => {
    const id = req.params.id;
    const resources = await Resource.findById(id).catch((error) => {
    //console.error(error);
    });
    if (!resources) {
    res.status(404).send("Author Not found");
    } else {
    const {type,url,SubjectId} = req.body;
    if (!type || !url) {
        res.status(400).send("Please provide required fields");
    } else {
        Service.update(res,resources,{type,url,SubjectId}).catch((error)=>{
            res.status(500).send(error+"Server Error")
           })
        
    }
    }
});

module.exports = router;