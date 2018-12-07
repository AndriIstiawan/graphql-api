var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order_statusSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
var Model = mongoose.model('order_statuses', Order_statusSchema);
module.exports = Model;