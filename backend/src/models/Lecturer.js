const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lecturerSchema = new Schema({
    LecturerId: { type :String,required:true},
	Password: { type :String,required:true},
	username: { type :String,required:true},
	Department: { type :String,required:true}

})

const Lecturer= mongoose.model('lecturer',lecturerSchema)
module.exports=Lecturer