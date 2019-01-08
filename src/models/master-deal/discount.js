var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiscountSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    value: {
        type: String
    },
    type: {
        type: String
    },
    expired_date: {
        type: String
    },
    brands: {
        type: Array
    },
    categories: {
        type: Array
    },
    products: {
        type: Array
    },
    levels: {
        type: Array
    },
    members: {
        type: Array
    },
});
var Model = mongoose.model('discount', DiscountSchema);
module.exports = Model;