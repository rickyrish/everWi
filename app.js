//libs
var express = require("express");
var bodyParser = require("body-parser");
var formidable = require("express-formidable");
var session = require("cookie-session");
var methodOverride = require("method-override");
//middleware
var session_middleware = require("./middlewares/session");
//routes
var router_app = require("./routes_app");

//models
var User = require("./models/user").User;

var app = express();
//instances
app.use(methodOverride("_method"));
app.use("/public",express.static('public'));
app.set("view engine","jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(formidable({ keepExtension: true }));
app.use(session({
  name: 'session',
  keys: ['secretKeyForEverWi'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use("/app", router_app);

//routes
app.get("/", function(req,res){
	if(req.session.user_id){
		res.redirect("/app");
	}
	res.render("login");
});
app.get("/login", function(req,res){
	if(req.session.user_id){
		res.redirect("/app");
	}
	res.render("login");
});

app.post("/login", function(req,res){
	User.findOne({email : req.fields.inputEmail,password: req.fields.inputPassword},function(err,user){
		if(err){
			res.redirect("/");
		}
		req.session.user_id = user._id;
		res.redirect("/app");
	});
});

app.get("/registrar", function(req,res){
	res.render("signup")
})
.post("/registrar",function(req,res){
	console.log(req.fields);
	var user = new User({
							email : req.fields.inputEmail,
							password: req.fields.inputPassword,
							password_confirmation: req.fields.inputPasswordC,
							username: req.fields.inputUsername
						});
	user.save().then(function(us){
		res.send("guaramos el usuario existosamente");
	},function(error){
		if(error){
			console.log(String(error));
			res.send("no pudimos guardar la información.")
		}
	});
});

app.listen(8080);