var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var PostSchema = new Schema({
	artist: String,
	design: String,
	artFile: String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
