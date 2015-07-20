var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

// user schema
var UserSchema = new Schema({
  userName: String,
  email: String,
  passwordDigest: String
});

// create a new user with hashed password
UserSchema.statics.createSecure = function (userData, callback) {
  //this refers to user Schema
  var that = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(userData.password, salt, function (err, hash) {
      console.log(hash);

      // create the new user (save to db) with hashed password
      that.create({
        userName: userData.userName,
        email: userData.email,
        passwordDigest: hash
      }, callback);
    });
  });
};

// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    console.log(user);

    // throw error if can't find user
    if (user === null) {
      throw new Error('Whoops!! User with ' + email + ' not found!');

    // if found user, check if password is correct
    } else if (user.checkPassword(password)) {
      callback(null, user);
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
UserSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

// create and export User model
var User = mongoose.model('User', UserSchema);
module.exports = User;