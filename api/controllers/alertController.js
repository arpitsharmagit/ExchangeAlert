var mongoose = require('mongoose'),
  Alert = mongoose.model('Alerts');

  exports.list_all_alert = function(req, res) {
    Alert.find({}, function(err, alert) {
      if (err)
        res.send(err);
      res.json(alert);
    });
  };
  
  exports.create_a_alert = function(req, res) {
    var new_alert = new Alert(req.body);
    new_alert.save(function(err, alert) {
      if (err)
        res.send(err);
      res.json(alert);
    });
  };
  
  exports.read_a_alert = function(req, res) {
    Alert.findById(req.params.deviceId, function(err, alert) {
      if (err)
        res.send(err);
      res.json(alert);
    });
  };
  exports.update_a_alert = function(req, res) {
    Alert.findOneAndUpdate({_id: req.params.deviceId}, req.body, {new: true}, function(err, alert) {
      if (err)
        res.send(err);
      res.json(alert);
    });
  };
  
  exports.delete_a_alert = function(req, res) {
    Alert.remove({
      _id: req.params.deviceId
    }, function(err, alert) {
      if (err)
        res.send(err);
      res.json({ message: 'Alert successfully deleted' });
    });
  };
  
  