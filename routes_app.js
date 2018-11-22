var express = require("express");
 var router = express.Router();
var Project = require("./models/project").Project;

var session_middleware = require("./middlewares/session");

 router.get("/", function(req,res){
 	res.render("app/index");
 });

 router.get("/projects/", function(req,res){
 	Project.find({creator: req.session.user_id}, function(err,proyectos){
 		if(err){ res.redirect("/app"); return;}
			res.render("app/projects/index",{proyectos: proyectos});
		}).sort("-createDate");
 });
 router.get("/projects/new", function(req,res){
 	res.render("app/projects/new");
 });
 router.post("/projects/new", function(req,res){
 	var project = new Project({
							codProj : req.fields.codProj,
							nameProj: req.fields.nameProj,
							description: req.fields.description,
							createDate: Date.now(),
							creator: req.session.user_id
						});
	project.save().then(function(us){
		res.redirect("/app/projects");
	},function(error){
		if(error){
			console.log(String(error));
			res.send("no pudimos guardar la información.")
		}
	});
 });


  module.exports = router;