const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    AdminId: { type :String,required:true},
    Password : { type :String,required:true},
	username : { type :String,required:true},

})

const Admin= mongoose.model('admin',adminSchema)
module.exports=Admin