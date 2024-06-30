const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    StudentId: { type :String,required:true},
	Password: { type :String,required:true},
	name: { type :String,required:true},
	Department: { type :String,required:true}

})

const Student= mongoose.model('student',studentSchema)
module.exports=Student