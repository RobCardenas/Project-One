var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var PostSchema = new Schema({
	artist: String,
	design: String,
	artFile: String,
	votes: Number
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
