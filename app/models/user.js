var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    Show         = require('./show.js'),
    bcrypt       = require('bcrypt-nodejs');

var UserSchema   = new Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false }
});

UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});


UserSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};


UserSchema.methods.shows = function(callback) {
  Show.find({user: this._id}, function(err, shows) {
    callback(err, shows);
  });
};

module.exports = mongoose.model('User', UserSchema);
