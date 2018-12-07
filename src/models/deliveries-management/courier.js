var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourierSchema = new Schema({
    courier: {
        type: String
    },
    type: {
        type: String
    },
    slug: {
        type: String
    },
    location: {
        type: Array
    },
    service: {
        type: Array
    },
    status: {
        type: String
    },
});
var Model = mongoose.model('couriers', CourierSchema);
module.exports = Model;