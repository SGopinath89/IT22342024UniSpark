const express = require('express')
const mongoose= require('mongoose')
const app = new express()
const port = 8080

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/UniSparkDb').then(()=>{
    console.log('conected database');
}).catch((error)=>{
    console.error(error)
})

app.listen(port,()=>{
    console.log("The API is running",port)
})
