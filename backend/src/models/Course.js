const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
   
    Course_name: { type :String,required:true}

})

const Course = mongoose.model('course',CourseSchema)
module.exports=Course