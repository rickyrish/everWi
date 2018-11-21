var express = require("express");
 var router = express.Router();

var session_middleware = require("./middlewares/session");

 router.get("/", function(req,res){
 	res.render("app/index");
 });

 router.get("/projects/new", function(req,res){

 });


  module.exports = router;