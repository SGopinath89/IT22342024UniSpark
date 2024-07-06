const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    SubjectCode: { type :String,required:true},
	Subjectname: { type :String,required:true},
	Course_ID: { type: Schema.Types.ObjectId,required:true, ref: 'courses' }
})


const Subject= mongoose.model('subject',SubjectSchema)
module.exports=Subject
