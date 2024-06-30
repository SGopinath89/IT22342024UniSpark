const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    SubjectCode: { type :String,required:true},
	Subjectname: { type :String,required:true},
	Course_ID: { type: mongoose.Types.ObjectId, required: true },

})

const Subject= mongoose.model('subject',subjectSchema)
module.exports=Subject
