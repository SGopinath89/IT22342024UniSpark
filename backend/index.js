const express = require('express')
const mongoose= require('mongoose')
const app = new express()
const port = 8080

const adminRoute=require('./src/routes/adminRoute')
const instructorRoute=require('./src/routes/instructorRoute')
const lecturerRoute=require('./src/routes/lecturerRoute')
const studentRoute=require('./src/routes/studentRoute')

const chatRoute=require('./src/routes/chatRoute')
const courseRoute=require('./src/routes/courseRoute')
const subjectRoute=require('./src/routes/subjectRoute')
const resourceRoute=require('./src/routes/resourceRoute')

app.use('/uploads', express.static('uploads'));

const bodyparser=require('body-parser')

app.use(express.json());
app.use(bodyparser.json());


mongoose.connect('mongodb://localhost:27017/UniSparkDb').then(()=>{
    console.log('conected database');
}).catch((error)=>{
    console.error(error)
})

app.use('/admin',adminRoute)
app.use('/instructor',instructorRoute)
app.use('/lecturer',lecturerRoute)
app.use('/student',studentRoute)

app.use('/chat',chatRoute)
app.use('/course',courseRoute)
app.use('/subject',subjectRoute)
app.use('/resource',resourceRoute)


app.listen(port,()=>{
    console.log("The API is running",port)
})
