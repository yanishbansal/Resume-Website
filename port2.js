var express = require('express');
var bp = require('body-parser');
var mongoose = require('mongoose'); mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.cljzb.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true });
var todo = require('./public/models/tododb.js');
var user = require("./public/models/user.js");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose'); // here passport mongoose is install to use  =require("./public/models/user.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash'); // Add this line

var app = express();

// latest changes were made here , Set the view engine to EJS and the views directory
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());



app.use(require("express-session")({
	secret: 'yb',
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		mongoUrl: 'mongodb+srv://mongodb:mongodb@cluster0.cljzb.mongodb.net/Cluster0?retryWrites=true&w=majority',
		collectionName: 'sessions',
		ttl: 14 * 24 * 60 * 60 // Session expiration in seconds (14 days)
	})
}));
app.use(passport.initialize());
app.use(passport.session());	// Required for persistent login sessions (optional, but recommended)
app.use(flash()); // Add flash middleware after session middleware

// Pass flash messages to all views
app.use((req, res, next) => {
	res.locals.error = req.flash('error');
	next();
});

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser()); // user  is defined in module having passport-local-mongoose plugin and userschema. 
passport.deserializeUser(user.deserializeUser());

// another cmnds user.register() aand passport.authenticate 
// passport.authincate layi we use passport-local package and cmnd is passport.use( new <Localstrategy>(<user>.authenticate()));
//req.logout() in logout route ........ It is also defined in passport only!! 
//then the bellowed defined func as middleware in the route we want to check if it is our user.... 


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}



// Routes
app.get('/', (req, res) => {
	res.render("portfoio.html", {});
});


app.get('/ColorGame', (req, res) => {
	res.render("colorGame.html", {});
});


app.get('/SimpleTodoList', (req, res) => {

	todo.find({}, (err, cntnt) => {
		res.render("Simpleindex.ejs", { todoItem: cntnt });
	})
});

app.post('/SimpleTodoList', (req, res) => {
	todo.create({ task: req.body.task }, (err, cntnt) => { console.log(cntnt); })
	res.redirect('/SimpleTodoList');
});


app.post('/SimpledeleteTodo', (req, res) => {
	todo.findByIdAndRemove(req.body.deleteId, (err, cntnt) => { console.log(cntnt); })
	res.redirect('/SimpleTodoList');
});


app.get('/TodoList', isLoggedIn, (req, res) => {
	user.findById(req.user._id, (err, cntnt) => {
		console.log(cntnt.list);
		res.render("index.ejs", { todoItem: cntnt.list });
	});
});

app.post('/TodoList', isLoggedIn, (req, res) => {
	user.findById(req.user._id, (err, uniqueUser) => {

		uniqueUser.list.push({ task: req.body.task });
		uniqueUser.save((err, cntnt) => { });
		//console.log(uniqueUser.list);
		res.redirect('/TodoList');
	});


});


app.post('/deleteTodo', isLoggedIn, (req, res) => {
	user.findById(req.user._id, (err, uniqueUser) => {
		console.log(uniqueUser.list);

		uniqueUser.list.id(req.body.deleteId).remove();
		uniqueUser.save((err, cntnt) => { res.redirect('/TodoList') });

	});
});


app.get('/pressanykey', (req, res) => {
	res.render("circles.html");
});

app.get('/register', (req, res) => {
	res.render("registerForm.ejs");
});

app.post('/register', (req, res) => {
	user.register(new user({ username: req.body.username }), req.body.password, (err, usercntnt) => {
		if (err) {
			console.log(err);
			if (err.name !== 'UserExistsError') {
				return res.redirect('/register');
			}
		}
		passport.authenticate("local")(req, res, () => { res.redirect('/TodoList'); })	// we could have used twitter google instead of local in pass.auth !!!!

	});

});

app.get('/login', (req, res) => {
	res.render("login.html", { error: res.locals.error }); // Update the login GET route to pass the error message
});

app.post('/login', passport.authenticate('local', {
	successRedirect: "/TodoList",
	failureRedirect: "/login",
	failureFlash: true // Enable flash messages for failed login
}), (req, res) => { });


app.get('/logout', (req, res) => {
	req.logout(); // may be this is password function.........
	res.redirect("/login");
});


app.get('/:home', (req, res) => {
	res.redirect("/");
});


app.get('*', (req, res) => {
	res.render("snap.ejs");
});


// listening ports  
app.listen(process.env.PORT || '80', () => {
	console.log("port running babe");
});