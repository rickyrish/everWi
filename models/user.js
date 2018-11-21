var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/everwi",{useNewUrlParser: true});

var match_correo = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Colocar un email valido"];

var user_schema = new Schema({
	name: String,
	username: {type:String, required: true, maxlength: [50,"Username muy grande"]},
	password: {type:String, minlength:[6,"Password es muy corto"],
				validate: {
					validator: validar_password_confirmation,
					message: "contranseñas no son iguales"
				}
},
	email: {type: String, required: "El correo es obligatorio", match: match_correo}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.pc;
}).set(function(password){
	this.pc = password;
});

var User = mongoose.model("User",user_schema);
module.exports.User = User;

//validaciones
function validar_password_confirmation(p){
	return this.password_confirmation == p;
	}