var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.cljzb.mongodb.net/Cluster0?retryWrites=true&w=majority',{useNewUrlParser: true});

var todoItemSchema = new mongoose.Schema({task:String});
var todoItem = mongoose.model("todo_db",todoItemSchema); 

//todoItem.collection.drop();
//todoItem.create({task:"add your todo"},(err,cntnt)=>{console.log("added");});

module.exports=todoItem;
