var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = new Schema({
    logo: {
        type: String
    },
    favicon: {
        type: String
    },
    site_title: {
        type: String
    },
    site_status: {
        type: Boolean
    },
    phone_number: {
        type: String
    },
    email_info: {
        type: String
    },
    meta_title: {
        type: String
    },
    meta_description: {
        type: String
    },
    order_expire: {
        type: Number
    },
    transaction_price: {
        type: Number
    },
    transaction_point: {
        type: String
    },
    member_log_expire: {
        type: Number
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
});
var Model = mongoose.model('setting', SettingSchema);
module.exports = Model;