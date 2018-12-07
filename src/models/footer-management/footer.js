var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FooterSchema = new Schema({
    left: {
        type: Array
    },
    middle: {
        type: Array
    },
    right: {
        type: Array
    },
});
var Model = mongoose.model('footer', FooterSchema);
module.exports = Model;