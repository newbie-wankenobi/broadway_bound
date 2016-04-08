var User        = require('../models/user.js'),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.superSecret;

var userAuth = function (req, res, next) {
  User.findOne({
      email: req.body.email
    }).select('email password name').exec(function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {

        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {

          var token = jwt.sign({
            email: user.email,
            name:  user.name,
            _id:   user._id
          }, superSecret, {
            expiresInMinutes: 43200
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token:   token,
            user:    user
          });
        }

      }

    });
  };

var tokenVerify = function(req, res, next) {
  console.log('Enjoy your theater experience!');

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
      });
      } else {
        req.decoded = decoded;

        next();
      }
    });

  } else {

    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};

var userCreate = function(req, res) {
    var user      = new User();
    user.name     = req.body.name;
    user.email    = req.body.email;
    user.password = req.body.password;


    user.save(function(err) {
        if (err) {

          if (err.code == 11000)
            return res.json({ success: false, message: 'A user with that email already exists! '});
          else
            return res.json(err);
        }


        res.json({ message: "Let's get singin'!" });
      });

};


var userShow = function(req, res) {
  User.findById(req.params.id, function(err, user) {
        if (err) res.send(err);

        res.json(user);
  });
};

var usersAll = function(req, res) {
  User.find({}, function(err, users) {
        if (err) res.send(err);

        res.json(users);
  });
}

var userUpdate = function(req, res) {
  User.findById(req.params.id, function(err, user) {

        if (err) res.send(err);

        if (req.body.name)     user.name     = req.body.name;
        if (req.body.email)    user.email    = req.body.email;
        if (req.body.password) user.password = req.body.password;

        user.save(function(err) {
          if (err) res.send(err);

          res.json({ message: 'User updated!' });
        });
  });
}

var userDelete = function(req, res) {
  User.remove({
        _id: req.params.id
      }, function(err, user) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
  });
}

module.exports = {
  userAuth:     userAuth,
  tokenVerify:  tokenVerify,
  userCreate:   userCreate,
  userShow:     userShow,
  usersAll:     usersAll,
  userUpdate:   userUpdate,
  userDelete:   userDelete
};
