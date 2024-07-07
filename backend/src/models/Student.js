const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
   
	Password: { type :String,required:true},
	username: { type :String,required:true},
	Department: { type :String,required:true}

})

const Student= mongoose.model('student',studentSchema)
module.exports=Student