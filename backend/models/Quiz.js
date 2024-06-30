const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quizSchema = new Schema({
    questions: { type :String,required:true},

})

const Quiz = mongoose.model('quiz',quizSchema)
module.exports=Quiz
