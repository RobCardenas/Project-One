var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({exteded: true}));

// variable to test seed data
var artPosts = [];

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// route to get data from api
app.get('/api/posts', function(req, res) {
	res.json(artPosts);
});

// server
app.listen(3000, function() {
	console.log('localhost now Running.')
});