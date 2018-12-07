var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentMethodSchema = new Schema({
    type: {
        type: String
    },
    key: {
        type: String
    },
    image: {
        type: String
    },
    name: {
        type: String
    },
    account: {
        type: String
    },
    account_number: {
        type: String
    },
    status: {
        type: String
    },
    detail: {
        type: Array
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    },
    deleted_at: {
        type: String
    },
});
var Model = mongoose.model('payment_methods', PaymentMethodSchema);
module.exports = Model;