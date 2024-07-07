const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const resourceSchema=new mongoose.Schema({
	type: String,
	url: String,
    SubjectId:{ type: Schema.Types.ObjectId,required:true, ref:'subjects'}
});

const Resource= mongoose.model('resource',resourceSchema)
module.exports=Resource