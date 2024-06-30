const express = require("express");
const router = express.Router();
const Chat= require("../models/Chat");
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
//const { verifyToken } = require("../security/auth");
const name="Chat";


module.exports = router;