const express = require("express");
const router = express.Router();
const Quiz= require("../models/Quiz");
const Service = require("../service/GenericService")
const{default:mongoose}=require('mongoose')
//const { verifyToken } = require("../security/auth");
const name="Quiz";


module.exports = router;