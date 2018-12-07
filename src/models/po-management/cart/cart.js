var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    IP: {
        type: String
    },
    member: {
        type: Array
    },
    products: {
        type: Array
    },
    total_price: {
        type: Array
    },
    total_weight: {
        type: Array
    },
    address: {
        type: Array
    },
    courier: {
        type: Array
    },
    note: {
        type: String
    },
    midtrans_token: {
        type: String
    },
    payment_status: {
        type: Boolean
    },
    promo: {
        type: Array
    },
    promo_used: {
        type: Boolean
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
    deleted_at: {
        type: String
    }
});
var Model = mongoose.model('cart', CartSchema);
module.exports = Model;