const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
        Message: { type :String,required:true},


})

const Chat= mongoose.model('chat',chatSchema)
module.exports=Chat
