var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    weight: {
        type: Array
    },
    stock: {
        type: Number
    },
    sku: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    },
    image: {
        type: Array
    },
    price: {
        type: Array
    },
    variant: {
        type: Array
    },
    categories: {
        type: Array
    },
    discounts: {
        type: Array
    },
    discount_percent: {
        type: Number
    },
    discount_price: {
        type: Number
    }
});
var Model = mongoose.model('product', ProductSchema);
module.exports = Model;