var express = require('express'),
    config = require('config'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Alert = require('./models/alertModel'),
    port = config.get("app.port") || 3000;


mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongodb'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/alertRoutes');
routes(app); 
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

function startAPIServer(){
    app.listen(port);
    console.log('RESTful API server started on: ' + port);    
}
module.exports = startAPIServer;