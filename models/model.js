var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var PostSchema = new Schema({
	artFile: String,
	design: String,
	artist: String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
