var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    member: {
        type: Array
    },
    order_id: {
        type: String
    },
    cart: {
        type: Array
    },
    inquiry: {
        type: Array
    },
    payment: {
        type: Array
    },
    deliveries: {
        type: Array
    },
    courier: {
        type: Array
    },
    total_price: {
        type: Number
    },
    status: {
        type: String
    },
    type: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    },
});

var Model = mongoose.model('order', OrderSchema);
module.exports = Model;