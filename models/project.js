var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/everwi",{useNewUrlParser: true});

var project_schema = new Schema({
		codProj: {type:String, required: true},
		nameProj : {type:String, required: true},
		description: {type:String, required: true},
		createDate: {type:Date, requred:true},
		creator: {type: Schema.Types.ObjectId, ref: "User"}
});


var Project = mongoose.model("Project",project_schema);
module.exports.Project = Project;