
var Show = require("../models/show");


var show = function(req, res, next){
  var id = req.params.id;

  Show.findById(id, function(err, show){
    if (err) {
      res.send(err);
    }

    res.json(show);
  });
};

var showIndex = function(req, res) {
  Show.find({}, function(err, shows) {
    if (err) {
      res.send(err);
    }

    res.json(shows);
  });
}


var showCreate = function(req, res) {
  var show       = new Show();

  show.name      = req.body.name;
  show.category  = req.body.category;

  show.save(function(err, savedShow) {
    if (err) {
      res.send(err)
    }

    console.log("Amazing Show!")
    res.json(savedShow);
  });
};


var showUpdate = function(req, res) {
  var id = req.params.id;

  Show.findById(id, function(err, show) {

    if (err) {
      res.send(err);
    }

    if (req.body.name) show.name = req.body.name;
    if (req.body.category) show.category = req.body.category;

    show.save(function(err, updatedShow) {
      if (err) {
        res.send(err);
      }
      console.log("Was that show for real?!");
      res.json(updatedShow);
    });
  });
}

var showDelete = function(req, res) {

  var id = req.params.id;

  Show.remove({"_id" : id}, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Forget that Show!' });
  });
}

// Export the function/s as JSON
module.exports = {
  showShow:   showShow,
  showIndex:  showIndex,
  showCreate: showCreate,
  showUpdate: showUpdate,
  showDelete: showDelete
}
