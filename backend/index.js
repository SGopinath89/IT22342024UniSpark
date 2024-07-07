const express = require('express')
const mongoose= require('mongoose')
const app = new express()
const port = 8080

const adminRoute=require('./src/routes/adminRoute')
const instructorRoute=require('./src/routes/instructorRoute')
const studentRoute=require('./src/routes/studentRoute')

const resourceRoute=require('./src/routes/resourceRoute')


app.use(express.json());


mongoose.connect('mongodb://localhost:27017/UniSparkDb').then(()=>{
    console.log('conected database');
}).catch((error)=>{
    console.error(error)
})

app.use('/admin',adminRoute)
app.use('/resource',resourceRoute)


app.listen(port,()=>{
    console.log("The API is running",port)
})
