var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InquirySchema = new Schema({
    IP: {
        type: String
    },
    member: {
        type: Array
    },
    inquiries: {
        type: Array
    },
    total_price_inquiry: {
        type: Number
    },
    status: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
});
var Model = mongoose.model('inquirie', InquirySchema);
module.exports = Model;