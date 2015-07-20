var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	_ = require("underscore");

app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// root route (serves all.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/all.html');
});

// root route (serves all.html)
app.get('/home', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// include our module from the other file
var Post = require("./models/model");

// connect to db
mongoose.connect('mongodb://localhost/project-one');

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
	artFile: req.body.artFile,
	design: req.body.design,
    artist: req.body.artist
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

app.put('/api/posts/:id', function (req,res) {
  var targetId = req.params.id;
  Post.findOne({_id: targetId}, function(err, foundPost) {
    foundPost.artFile = req.body.artFile;
    foundPost.design = req.body.design;
    foundPost.artist = req.body.artist;

    foundPost.save(function (err,savedPost) {
      res.json(savedPost);
    });
  });
});

// delete post
app.delete('/api/posts/:id', function (req, res) {
    //set the value of the desired id
    var targetId = req.params.id;
    //find the correct post in the db and remove it
    Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
      res.json(deletedPost);
    });
  });



// server
app.listen(3000, function() {
	console.log('localhost now running.')
});