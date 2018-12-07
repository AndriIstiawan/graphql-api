var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromoSchema = new Schema({
    image: {
        type: String
    },
    title: {
        type: String
    },
    code: {
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
    target: {
        type: Array
    },
    content_html: {
        type: String
    },
    levels: {
        type: Array
    },
    members: {
        type: Array
    },
});
var Model = mongoose.model('promo', PromoSchema);
module.exports = Model;