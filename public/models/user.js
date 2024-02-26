var mongoose = require('mongoose');
var passportLocalMongoose =require('passport-local-mongoose');
mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.cljzb.mongodb.net/Cluster0?retryWrites=true&w=majority',{useNewUrlParser: true});


var listschema = new mongoose.Schema({task:String});
var userSchema = new mongoose.Schema({username:String, password:String, list:[listschema]});

userSchema.plugin(passportLocalMongoose); // passes pass func in mongoose lang for db database.

var user = mongoose.model("Users",userSchema);

//user.create({username:"yb", password:"yb"}); 

module.exports=user;