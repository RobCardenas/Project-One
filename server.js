var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	_ = require("underscore"),
	session = require('express-session'),
	config = require('./config'),
	Post = require('./models/model'),
	User = require('./models/user');

// connect to db
mongoose.connect(config.MONGO_URI);

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

// all page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/all.html');
});

// route (index.html)
app.get('/home', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});


// user profile page
app.get('/profile', function (req, res) {
	//check for current user
	req.currentUser(function (err, user) {
		if (user) {
			res.sendFile(__dirname + '/public/views/profile.html')
		} else {
			res.redirect('/home');
		}
	});
});

// create new user with strong and secure password
app.post('/users', function (req, res) {
  var newUser = req.body.user;
  User.createSecure(newUser, function (err, user) {
    // log in user immediately when created
    req.login(user);
    res.redirect('/profile');
  });
});

// authenticate user and set session
app.post('/login', function (req, res) {
  var userData = req.body.user;
  User.authenticate(userData.email, userData.password, function (err, user) {
    req.login(user);
    res.redirect('/profile');
  });
});

// logout route
app.post('/logout', function (req, res) {
  req.logout();
  res.redirect('/home');
});

// API ROUTES

//show logged in user
app.get('/api/users/current', function (req, res) {
	req.currentUser(function (err, user) {
		res.json(user);
	});
});


// create new post
app.post('/api/users/current/posts', function (req, res) {
  // create new instance of art post
  var newPost = new Post({
	artist: req.body.artist,
	design: req.body.design,
    artFile: req.body.artFile
  });

  // save new post in db
  newPost.save();
  req.currentUser(function (err, user) {
  	user.posts.push(newPost);
  	user.save();
  	res.json(newPost);
  });
});

// show all posts
app.get('/api/posts', function (req, res) {
  Post.find(function (err, posts) {
    res.json(posts);
  });
});

// create new post
app.post('/api/posts', function (req, res) {
	var newPost = new Post({
	artist: req.body.artist,
	design: req.body.design,
    artFile: req.body.artFile
	});

	// save new post
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


app.listen(config.PORT);