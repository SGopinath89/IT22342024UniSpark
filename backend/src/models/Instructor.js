const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema({
   
    password : { type :String,required:true},
	userame : { type :String,required:true},
	
})

const Instructor= mongoose.model('instructor',instructorSchema)
module.exports=Instructor