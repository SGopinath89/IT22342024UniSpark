const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
   
    password : { type :String,required:true},
	username : { type :String,required:true},

})

const Admin= mongoose.model('admin',adminSchema)
module.exports=Admin