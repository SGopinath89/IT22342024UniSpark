const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema({
   
    Password : { type :String,required:true},
	username : { type :String,required:true},
	
})

const Instructor= mongoose.model('instructor',instructorSchema)
module.exports=Instructor