const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema({
    InstructorId: { type :String,required:true},
    Password : { type :String,required:true},
	Name : { type :String,required:true},
	
})

const Instructor= mongoose.model('instructor',instructorSchema)
module.exports=Instructor