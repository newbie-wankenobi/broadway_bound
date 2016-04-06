var mongoose = require('mongoose'),
    User     = require('./user.js');


var fishSchema = new mongoose.Schema({
  name:       String,
  category:   String,
  user:       { type: mongoose.Schema.Types.ObjectId, ref:'User' }
});


var Show = mongoose.model('Show', showSchema);


module.exports = Show;
