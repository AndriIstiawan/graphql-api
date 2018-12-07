var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    image_url: {
        type: String
    },
    firebase_token: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    point: {
        type: Number
    },
    status: {
        type: String
    },
    dompet: {
        type: Number
    },
    koin: {
        type: Number
    },
    promo: {
        type: Array
    },
    level: {
        type: Array
    },
    address: {
        type: Array
    },
    social_media: {
        type: Array
    },
    type: {
        type: Array
    },
    verification: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
});
var Model = mongoose.model('member', MemberSchema);
module.exports = Model;