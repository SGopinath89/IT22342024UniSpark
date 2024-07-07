const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
        Message: { type :String,required:true},
        StudentId: { type: Schema.Types.ObjectId, required: true,ref: 'student' }, // Reference to Student
        InstructorId: { type: Schema.Types.ObjectId, required: true, ref: 'instructor' }, // Reference to Instructor
        timestamp: { type: Date, default: Date.now }
})

const Chat= mongoose.model('chat',chatSchema)
module.exports=Chat
