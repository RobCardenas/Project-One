var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	_ = require("underscore"),
	session = require('express-session')
	config = require('./config');

app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// root route (serves all.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/all.html');
});

// route (index.html)
app.get('/home', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// include our module from the other file
var Post = require("./models/model");

// include user module
var User = require('./models/user');

// connect to db
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/project-one' 
);

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: config.SESSION_SECRET,
  cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

// create new user with secure password
app.post('/signup', function (req, res) {
  var newUser = req.body.user;
  User.createSecure(newUser, function (err, user) {
    // log in user immediately when created
    req.login(user);
    res.redirect('/');
  });
});

// authenticate user and set session
app.post('/login', function (req, res) {
  var userData = req.body.user;
  User.authenticate(userData.email, userData.password, function (err, user) {
    req.login(user);
    res.redirect('/home');
  });
});

// logout route
app.post('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// route to update votes
app.put('/api/posts/:id', function (req,res) {
  var targetId = req.params.id;
  Post.findOne({_id: targetId}, function(err, foundPost) {
    foundPost.votes = req.body.votes;
	foundPost.save(function (err,savedPost) {
      res.json(savedPost);
    });
  });
});

// API ROUTES
// show all posts
app.get('/api/posts', function (req, res) {
  Post.find(function (err, posts) {
    res.json(posts);
  });
});

// create new post
app.post('/api/posts', function (req, res) {
  // create new instance of art post
  var newPost = new Post({
	artist: req.body.artist,
	design: req.body.design,
    artFile: req.body.artFile
  });

  // save new post in db
  newPost.save(function (err, savedPost) {
    res.json(savedPost);
  });
});

// route for single id
app.get('/api/posts/:id', function (req, res) {
	//set the value of the id
    var targetId = req.params.id;
    //find correct post in the db by id
    Post.findOne({_id: targetId}, function (err, foundPost) {
      res.json(foundPost);
    });
  });

// route to update post
app.put('/api/posts/:id', function (req,res) {
  var targetId = req.params.id;
  Post.findOne({_id: targetId}, function(err, foundPost) {
    foundPost.artist = req.body.artist;
    foundPost.design = req.body.design;
    foundPost.artFile = req.body.artFile;

    foundPost.save(function (err,savedPost) {
      res.json(savedPost);
    });
  });
});

// route to delete post
app.delete('/api/posts/:id', function (req, res) {
    //set the value of the desired id
    var targetId = req.params.id;
    //find the correct post in the db and remove it
    Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
      res.json(deletedPost);
    });
  });


app.listen(process.env.PORT || 3000);