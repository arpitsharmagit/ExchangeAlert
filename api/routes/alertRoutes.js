module.exports = function(app) {
    var alertCtrl = require('../controllers/alertController');
      
    app.route('/alerts')
      .get(alertCtrl.list_all_alert)
      .post(alertCtrl.create_a_alert);
  
  
    app.route('/alert/:alertId')
      .get(alertCtrl.read_a_alert)
      .put(alertCtrl.update_a_alert)
      .delete(alertCtrl.delete_a_alert);
  };
  