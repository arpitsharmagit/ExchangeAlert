var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AlertSchema = new Schema({
    deviceId: {
        type: String,
        required: 'Kindly provide deviceId'
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Alerts', AlertSchema);