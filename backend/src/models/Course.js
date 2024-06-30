const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    Course_ID: { type :String,required:true},
    Course_name: { type :String,required:true}

})

const Course = mongoose.model('course',courseSchema)
module.exports=Course