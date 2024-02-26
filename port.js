express=require('express');
app=express();

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

var bp=require('body-parser');
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.cljzb.mongodb.net/Cluster0?retryWrites=true&w=majority',
	{useNewUrlParser: true});

var todo=require('./public/models/tododb.js');

app.listen(process.env.PORT ||'80',()=>{
  console.log("port running babe");
});

 

app.get('/',(req,res)=>{
res.render("portfoio.html",{});
});


app.get('/ColorGame',(req,res)=>{
res.render("colorGame.html",{});
});


app.get('/TodoList',(req,res)=>{
	todo.find({},(err,cntnt)=>{
      res.render("index.ejs",{todoItem:cntnt});		
	})
});

app.post('/TodoList',(req,res)=>{
	todo.create({task:req.body.task},(err,cntnt)=>{console.log(cntnt);})
	res.redirect('/TodoList');
});


app.post('/deleteTodo',(req,res)=>{
	todo.findByIdAndRemove(req.body.deleteId,(err,cntnt)=>{console.log(cntnt);})
	res.redirect('/TodoList');
});


app.get('/pressanykey',(req,res)=>{
	res.render("circles.html");
});




///////////////////// adding database



var catSchema = new mongoose.Schema({name: String , weapon: String});
var cat = mongoose.model("cat",catSchema);

//new cat({name:'tom', weapon: 'paws'}).save((err,cntnt)=>{
 //console.log(cntnt);  
//});

// data base ko temp khin bhi js mein bhi and ejs mein bhi 

//.find({name:'tom'},(err,cntnt)=>{console.log(`take thisss ${cntnt}` )});
// or 
//cat.find({name:'tom'},(err,cntnt)=>{console.log("take thisss " + cntnt)});

//cat.findById({ "_id":"6001c8a5827ba16f1ca1b4d1"},(err,cntnt)=>{console.log("take thisss " + cntnt)});
 
//cat.findById("6001c8a5827ba16f1ca1b4d1",(err,cntnt)=>{console.log("take thisss " + cntnt)});



app.get('/:home',(req,res)=>{
	

    cat.find({},(err,cntnt)=>{
    
    res.render("cat.ejs",{Cats:cntnt});
 });

});


app.get('*',(req,res)=>{
	res.render("snap.ejs");
});







// sementic ui is like bootstrap 
// { created: {type: Date, default: Date.now}    }
// .toDateString()



